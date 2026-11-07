/* Звук: цоканье копыт на весь заезд, овации и грустный аккорд — синтез
   на WebAudio, весёлый кюй на домбре — синтез щипковых струн
   (Караплус-Стронг). Внешних музыкальных записей нет. */
window.Sound = (function () {
  'use strict';

  var enabled = true;
  var ctx = null;
  var dombra = null;
  var hungry = null;
  var applauseClip = null;
  var hoofGain = null;
  var hoofTimer = null;
  var hoofNextTime = 0;
  var hoofPeriod = 0.34;
  var noiseData = null;

  function audio(src, vol) {
    var a = new Audio(src);
    a.preload = 'auto';
    a.volume = vol == null ? 1 : vol;
    return a;
  }

  function ctxOrNull() {
    if (!enabled) return null;
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    return ctx;
  }

  function playClip(el, opts) {
    if (!enabled) return;
    opts = opts || {};
    try {
      var node = el.cloneNode();
      node.volume = Math.max(0, Math.min(1, opts.volume == null ? 1 : opts.volume));
      node.playbackRate = opts.rate || 1;
      if (opts.pan && ctx && ctx.createStereoPanner) { /* необязательно */ }
      var p = node.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) { /* автозапуск может быть заблокирован до первого клика */ }
  }

  /* ── щипковая струна ─────────────────────────────────────────────── */
  function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  function pluckInto(out, sr, startSec, midi, durSec, gain, bright) {
    var freq = midiToFreq(midi);
    var n = Math.max(2, Math.round(sr / freq));
    var delay = new Float32Array(n);
    for (var i = 0; i < n; i++) delay[i] = Math.random() * 2 - 1;
    // начальный «щипок»: сглаживаем, чтобы не было цифрового треска
    var smooth = new Float32Array(n);
    for (var k = 0; k < n; k++) {
      smooth[k] = (delay[k] + (delay[(k + 1) % n] || 0)) * 0.5;
    }
    delay = smooth;

    var damp = bright ? 0.9975 : 0.9955;
    var idx = 0, prev = 0;
    var start = Math.floor(startSec * sr);
    var len = Math.floor(durSec * sr);
    for (var s = 0; s < len; s++) {
      var cur = delay[idx];
      var next = damp * 0.5 * (cur + prev);
      prev = cur;
      delay[idx] = next;
      idx = (idx + 1) % n;
      if (idx === 0) { /* круг замкнулся */ }
      var p = start + s;
      if (p >= 0 && p < out.length) {
        var t = s / len;
        var env = Math.min(1, s / (sr * 0.004)) * Math.pow(1 - t, 1.6);
        out[p] += cur * env * gain;
      }
    }
  }

  function buildDombra(sr) {
    var bpm = 138;
    var beat = 60 / bpm;
    var step = beat / 2;                       // восьмая
    var steps = 32;                            // 4 такта по 4/4
    var total = steps * step + 1.8;
    var out = new Float32Array(Math.ceil(total * sr));

    // весёлый кюй в ре мажоре: мелодия + вторая струна-«подголосок»
    var melody = [
      [62, 0], [66, 1], [69, 2], [74, 3], [69, 4], [66, 5], [69, 6],
      [67, 8], [71, 9], [74, 10], [79, 11], [74, 12], [71, 13], [67, 14],
      [69, 16], [73, 17], [76, 18], [81, 19], [76, 20], [73, 21], [69, 22],
      [74, 24], [69, 25], [66, 26], [62, 27], [62, 28], [66, 29], [69, 30], [74, 31]
    ];
    var bass = [
      [50, 0], [50, 4], [55, 8], [55, 12],
      [57, 16], [57, 20], [50, 24], [50, 28]
    ];

    melody.forEach(function (n) {
      var t = n[1] * step;
      pluckInto(out, sr, t, n[0], 0.9, 0.32, true);          // верхняя струна
      pluckInto(out, sr, t + 0.012, n[0] + 12, 0.5, 0.10, true); // октавный блеск
    });
    bass.forEach(function (n) {
      pluckInto(out, sr, n[1] * step, n[0], 1.4, 0.30, false); // нижняя струна
    });

    // финальный аккорд-удар по двум струнам
    var tail = steps * step - step;
    [62, 69, 74].forEach(function (m, i) {
      pluckInto(out, sr, tail + i * 0.03, m, 1.6, 0.26, true);
    });

    // мягкая нормализация
    var peak = 0;
    for (var i = 0; i < out.length; i++) peak = Math.max(peak, Math.abs(out[i]));
    if (peak > 0) {
      var k = 0.88 / peak;
      for (var j = 0; j < out.length; j++) out[j] *= k;
    }
    return out;
  }

  function buildHungry(sr) {
    // грустный «вздох»: две нисходящие ноты
    var total = 1.6;
    var out = new Float32Array(Math.ceil(total * sr));
    pluckInto(out, sr, 0.0, 57, 1.2, 0.34, false);
    pluckInto(out, sr, 0.35, 52, 1.2, 0.32, false);
    var peak = 0;
    for (var i = 0; i < out.length; i++) peak = Math.max(peak, Math.abs(out[i]));
    if (peak > 0) for (var j = 0; j < out.length; j++) out[j] *= 0.7 / peak;
    return out;
  }

  function toBuffer(c, data) {
    var buf = c.createBuffer(1, data.length, c.sampleRate);
    buf.getChannelData(0).set(data);
    return buf;
  }

  function playSamples(build) {
    var c = ctxOrNull();
    if (!c) return;
    if (c.state === 'suspended') c.resume().catch(function () {});
    try {
      var data = build(c.sampleRate);
      var src = c.createBufferSource();
      src.buffer = toBuffer(c, data);
      var gain = c.createGain();
      gain.gain.value = 0.9;
      src.connect(gain).connect(c.destination);
      src.start();
    } catch (e) { /* без звука игра остаётся играбельной */ }
  }

  /* ── цоканье копыт ─────────────────────────────────────────────── */
  function noiseBuffer(c) {
    if (noiseData && noiseData.length === Math.floor(c.sampleRate * 0.12)) return noiseData;
    var len = Math.floor(c.sampleRate * 0.12);
    var buf = c.createBuffer(1, len, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    noiseData = buf;
    return buf;
  }

  /* Один удар копыта: низкий «тук» + короткий шорох копыта по грунту. */
  function clop(c, when, accent) {
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(accent ? 132 : 104, when);
    osc.frequency.exponentialRampToValueAtTime(56, when + 0.1);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.5 : 0.3, when + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.15);
    osc.connect(gain).connect(hoofGain);
    osc.start(when);
    osc.stop(when + 0.17);

    var src = c.createBufferSource();
    src.buffer = noiseBuffer(c);
    var band = c.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = accent ? 1900 : 1500;
    band.Q.value = 0.9;
    var ngain = c.createGain();
    ngain.gain.setValueAtTime(accent ? 0.16 : 0.1, when);
    ngain.gain.exponentialRampToValueAtTime(0.0004, when + 0.07);
    src.connect(band).connect(ngain).connect(hoofGain);
    src.start(when);
    src.stop(when + 0.09);
  }

  function hoofLoop() {
    var c = ctxOrNull();
    if (!c || !hoofGain) return;
    var now = c.currentTime;
    if (hoofNextTime < now) hoofNextTime = now + 0.02;
    // планируем на 300 мс вперёд, чтобы ритм не дрожал
    while (hoofNextTime < now + 0.3) {
      var beat = Math.round(hoofNextTime / hoofPeriod);
      var accent = beat % 4 === 0;
      clop(c, hoofNextTime, accent);
      hoofNextTime += hoofPeriod * (0.97 + Math.random() * 0.06);
    }
  }

  return {
    isOn: function () { return enabled; },
    setEnabled: function (v) {
      enabled = !!v;
      if (!enabled) {
        stopHooves(150);
        if (ctx && ctx.state === 'running') ctx.suspend();
      } else if (hoofTimer) {
        hoofLoop();
      }
    },
    toggle: function () { enabled = !enabled; if (enabled && ctx && ctx.state === 'suspended') ctx.resume(); return enabled; },

    prime: function () {
      var c = ctxOrNull();
      if (c && c.state === 'suspended') c.resume().catch(function () {});
    },


    /* Цоканье копыт на весь заезд. */
    startRace: function () {
      if (!enabled) return;
      var c = ctxOrNull();
      if (!c) return;
      if (c.state === 'suspended') c.resume().catch(function () {});
      if (!hoofGain) {
        hoofGain = c.createGain();
        hoofGain.gain.value = 0.55;
        hoofGain.connect(c.destination);
      }
      hoofGain.gain.cancelScheduledValues(c.currentTime);
      hoofGain.gain.setValueAtTime(0.55, c.currentTime);
      hoofNextTime = c.currentTime + 0.08;
      if (!hoofTimer) hoofTimer = setInterval(hoofLoop, 60);
      hoofLoop();
    },

    stopRace: function (fadeMs) {
      stopHooves(fadeMs);
    },


    applause: function (volume) {
      if (!applauseClip) applauseClip = audio('audio/applause.mp3', 1);
      playClip(applauseClip, { volume: volume == null ? 1 : volume });
    },

    win: function () {
      if (!dombra) playSamples(function (sr) { dombra = buildDombra(sr); return dombra; });
      else playBuffer(dombra);
    },

    hungry: function () {
      if (!hungry) playSamples(function (sr) { hungry = buildHungry(sr); return hungry; });
      else playBuffer(hungry);
    }
  };

  function stopHooves(fadeMs) {
    if (!hoofGain) return;
    var c = ctx;
    var total = fadeMs == null ? 400 : fadeMs;
    try {
      var now = c.currentTime;
      hoofGain.gain.cancelScheduledValues(now);
      hoofGain.gain.setValueAtTime(hoofGain.gain.value, now);
      hoofGain.gain.linearRampToValueAtTime(0.0001, now + total / 1000);
    } catch (e) {}
    if (hoofTimer) { clearInterval(hoofTimer); hoofTimer = null; }
  }

  function playBuffer(data) {
    var c = ctxOrNull();
    if (!c) return;
    if (c.state === 'suspended') c.resume().catch(function () {});
    try {
      var src = c.createBufferSource();
      src.buffer = toBuffer(c, data);
      var gain = c.createGain();
      gain.gain.value = 0.9;
      src.connect(gain).connect(c.destination);
      src.start();
    } catch (e) {}
  }
})();
