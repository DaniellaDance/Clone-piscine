/* Лошади: одна анатомическая схема, разные породы (пропорции, грива, хвост)
   и масти. Сверху — седло со вальтрапом, уздечка с поводом, копыта с
   венчиком. Градиенты заданы в координатах холста (userSpaceOnUse), поэтому
   части корпуса стыкуются без швов. */
window.Horses = (function () {
  'use strict';

  var seq = 0;

  var COATS = {
    bay: {
      title: 'Гнедая', note: 'коричневый корпус, чёрные грива и ноги',
      top: '#b0703f', base: '#8d4a26', dark: '#5d2f14', belly: '#4a2511',
      leg: '#241610', mane: '#1f130d', maneLight: '#3f2a1c',
      muzzle: '#3a261e', hoof: '#1b1411', light: '#d59a70'
    },
    black: {
      title: 'Вороная', note: 'смоляная, с синим блеском',
      top: '#5d5f6d', base: '#2b2b33', dark: '#121216', belly: '#0c0c10',
      leg: '#101014', mane: '#0d0d11', maneLight: '#33333f',
      muzzle: '#141419', hoof: '#0a0a0d', light: '#8e90a2'
    },
    chestnut: {
      title: 'Рыжая', note: 'рыжий корпус, грива того же тона',
      top: '#e1955a', base: '#b8642c', dark: '#7c3f16', belly: '#65300e',
      leg: '#9c5226', mane: '#a2562a', maneLight: '#cf8551',
      muzzle: '#6a3a1b', hoof: '#2b1e15', light: '#f0b183'
    },
    grey: {
      title: 'Серая в яблоках', note: 'светло-серая, тёмная грива',
      top: '#ffffff', base: '#f3f4f5', dark: '#d6d9df', belly: '#c6cbd2',
      leg: '#edf0f3', mane: '#f5f6f8', maneLight: '#ffffff',
      muzzle: '#d9dde2', hoof: '#969da5', light: '#ffffff', dapple: false
    },
    buckskin: {
      title: 'Буланая', note: 'песочно-золотая, тёмные грива и ноги',
      top: '#f2d6a6', base: '#d5a974', dark: '#a3783f', belly: '#8b6330',
      leg: '#2a2118', mane: '#231a13', maneLight: '#4d3c29',
      muzzle: '#4a3828', hoof: '#241c14', light: '#fbeac8', dorsal: '#6b4a24'
    },
    palomino: {
      title: 'Паломино', note: 'золотая масть, льняная грива',
      top: '#ffe1a8', base: '#eabd74', dark: '#bf8b3f', belly: '#a2722f',
      leg: '#d9a95f', mane: '#f7efd9', maneLight: '#fffdf4',
      muzzle: '#8a6a44', hoof: '#2f2419', light: '#fff6dd'
    },
    pinto: {
      title: 'Пегая', note: 'белые пятна по гнедому корпусу',
      top: '#c07c48', base: '#93502a', dark: '#5f3016', belly: '#4a2511',
      leg: '#241610', mane: '#1f130d', maneLight: '#3f2a1c',
      muzzle: '#3a261e', hoof: '#1b1411', light: '#e2ab80', patch: '#fbf7ef'
    },
    roan: {
      title: 'Чалая', note: 'рыже-серая с белой примесью',
      top: '#d9b3a0', base: '#b98472', dark: '#8a5647', belly: '#71463a',
      leg: '#6c4234', mane: '#5e3b2f', maneLight: '#8b6152',
      muzzle: '#4f3529', hoof: '#2a201a', light: '#f2d8cc', speckle: true
    },
    dun: {
      title: 'Мышастая', note: 'дымчато-серая с тёмным ремнём по спине',
      top: '#d9cbae', base: '#b7a483', dark: '#8b7a5b', belly: '#77674c',
      leg: '#4a3f2e', mane: '#3b3125', maneLight: '#5f5341',
      muzzle: '#4b4032', hoof: '#2a241c', light: '#efe4cb', dorsal: '#5b4c37'
    }
  };

  var BREEDS = {
    kostanay:      { title: 'Костанайская', note: 'казахстанская верховая порода', transform: 'translate(0 0) scale(1.01 1.01)', mane: 'short', width: 1.02, leg: 1.04 },
    arabian:       { title: 'Арабская',              note: 'лёгкая, высоко несёт хвост', transform: '', mane: 'short', width: 1, leg: 1 },
    akhalteke:     { title: 'Ахалтекинская',        note: 'длинная шея, золотистый отлив', transform: 'translate(-2 -2) scale(1.03 1.02)', mane: 'sleek', width: 1, leg: 1, sheen: 0.1 },
    heavy:         { title: 'Владимирский тяжеловоз', note: 'массивный корпус, густая грива', transform: 'translate(1 2) scale(1 1.01)', mane: 'thick', width: 1.07, leg: 1.25 },
    pony:          { title: 'Шетлендский пони',     note: 'низкорослый, лохматая грива', transform: 'translate(16 18) scale(0.86)', mane: 'shaggy', width: 1.04, leg: 1.15 },
    mustang:       { title: 'Мустанг',              note: 'крепкий, выносливый', transform: 'translate(0 1) scale(0.99)', mane: 'wild', width: 1.02, leg: 1.05 },
    thoroughbred:  { title: 'Чистокровная верховая', note: 'скаковая порода', transform: 'translate(-1 -1) scale(1.02 1.01)', mane: 'sleek', width: 0.98, leg: 1.05, sheen: 0.07 }
  };

  /* Геометрия корпуса: круп, бочка, грудь, шея, голова. Одна и та же
     геометрия идёт и в заливку, и в обтравочный контур для пятен. */
  function bodyShapes(w) {
    return '' +
      '<path d="M 96 68 C 76 64 58 74 55 92 C 52 110 66 122 88 122 C 96 122 104 118 110 114 L 112 70 Z"/>' +
      '<ellipse cx="126" cy="95" rx="' + (44 * w).toFixed(2) + '" ry="25"/>' +
      '<path d="M 148 72 C 168 68 182 80 182 96 C 182 112 170 122 152 120 C 144 118 138 112 136 104 Z"/>' +
      '<path d="M 150 80 C 156 58 172 42 192 30 L 210 44 C 198 58 186 78 182 98 C 180 110 163 110 154 96 Z"/>' +
      '<path d="M 196 24 C 206 22 214 26 220 32 C 230 41 240 52 246 60 C 250 65 247 71 240 71 C 232 71 223 65 215 58 C 206 50 197 41 193 33 Z"/>';
  }

  function maneShape(kind, id) {
    var out = '';
    var m = 'url(#' + id + '-mane)';
    var ml = 'url(#' + id + '-maneLight)';
    var heavy = kind === 'thick' || kind === 'shaggy';

    // Гребень шеи: от затылка к холке.
    var crest = 'M 196 21 C 180 26 164 40 152 58 C 148 64 146 68 144 74';

    // Сама грива — толстая полоса по гребню.
    out += '<path d="' + crest + '" stroke="' + m + '" stroke-width="' + (heavy ? 12 : 9) +
      '" fill="none" stroke-linecap="round"/>';
    // Мягкий блик сверху.
    out += '<path d="' + crest + '" stroke="' + ml + '" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>';

    // Пряди, спадающие на шею.
    var locks = heavy ? 5 : 4;
    for (var i = 0; i < locks; i++) {
      var t = i / (locks - 1);
      var x = 191 - t * 40;
      var y = 24 + t * 42;
      var len = (heavy ? 26 : 20) + (i % 3) * 7 + t * 14;
      var sway = (i % 2 ? 1 : -1) * (4 + (i % 3) * 2);
      out += '<path d="M ' + x.toFixed(1) + ' ' + y.toFixed(1) +
        ' C ' + (x - 2 + sway).toFixed(1) + ' ' + (y + len * .35).toFixed(1) +
        ', ' + (x - 1 + sway).toFixed(1) + ' ' + (y + len * .7).toFixed(1) +
        ', ' + (x + sway).toFixed(1) + ' ' + (y + len).toFixed(1) +
        ' C ' + (x + 2.5).toFixed(1) + ' ' + (y + len * .62).toFixed(1) +
        ', ' + (x + 4).toFixed(1) + ' ' + (y + len * .3).toFixed(1) +
        ', ' + (x + 4).toFixed(1) + ' ' + y.toFixed(1) + ' Z" fill="' + m + '"/>';
      out += '<path d="M ' + (x + 1).toFixed(1) + ' ' + (y + 2).toFixed(1) +
        ' C ' + (x + sway * .5).toFixed(1) + ' ' + (y + len * .4).toFixed(1) +
        ', ' + (x + sway * .8).toFixed(1) + ' ' + (y + len * .68).toFixed(1) +
        ', ' + (x + sway).toFixed(1) + ' ' + (y + len * .9).toFixed(1) +
        '" stroke="' + ml + '" stroke-width="1" fill="none" opacity=".5" stroke-linecap="round"/>';
    }
    return out;
  }

  function forelock(id) {
    // Чёлка между ушами.
    return '<path d="M 197 28 C 192 32 188 40 186 48 C 191 42 196 36 201 32 Z" fill="url(#' + id + '-mane)"/>' +
      '<path d="M 196 30 C 192 35 189 41 188 47" stroke="url(#' + id + '-maneLight)" stroke-width="1.1" fill="none" opacity=".55" stroke-linecap="round"/>';
  }

  function tailShape(kind, id) {
    var thick = kind === 'thick' || kind === 'shaggy';
    var s = '';
    // репица и основание хвоста
    s += '<path d="M 64 74 C 58 80 56 92 54 102 C 60 94 66 86 72 82 Z" fill="url(#' + id + '-mane)"/>';
    s += '<path d="M 62 78 C 48 82 34 94 26 108 C 20 118 17 130 18 140 C 24 126 32 112 44 100 C 54 90 62 86 68 84 Z" fill="url(#' + id + '-mane)"/>';
    s += '<path d="M 64 82 C 50 90 38 104 31 120 C 26 131 23 142 24 150 C 28 136 34 122 44 110 C 54 98 62 92 68 88 Z" fill="url(#' + id + '-mane)" opacity=".9"/>';
    if (thick) {
      s += '<path d="M 60 80 C 44 88 32 104 26 122 C 22 136 20 148 22 156 C 26 140 32 126 42 114 C 52 100 62 92 70 88 Z" fill="url(#' + id + '-mane)" opacity=".8"/>';
    }
    for (var i = 0; i < 6; i++) {
      s += '<path d="M ' + (60 - i * 3).toFixed(1) + ' ' + (84 + i * 2).toFixed(1) +
        ' C ' + (42 - i * 5) + ' ' + (96 + i * 3) + ', ' + (26 - i * 3) + ' ' + (116 + i * 3) + ', ' +
        (22 - i * 3) + ' ' + (140 + i * 2) + '" stroke="url(#' + id + '-maneLight)" stroke-width="1.1" fill="none" opacity=".45" stroke-linecap="round"/>';
    }
    return s;
  }

  function defs(id, c) {
    return '<defs>' +
      '<linearGradient id="' + id + '-body" gradientUnits="userSpaceOnUse" x1="0" y1="56" x2="0" y2="126">' +
        '<stop offset="0" stop-color="' + c.top + '"/>' +
        '<stop offset="0.4" stop-color="' + c.base + '"/>' +
        '<stop offset="0.84" stop-color="' + c.dark + '"/>' +
        '<stop offset="1" stop-color="' + c.belly + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-mane" gradientUnits="userSpaceOnUse" x1="0" y1="26" x2="0" y2="130">' +
        '<stop offset="0" stop-color="' + c.maneLight + '"/>' +
        '<stop offset="0.4" stop-color="' + c.mane + '"/>' +
        '<stop offset="1" stop-color="' + c.mane + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-maneLight" gradientUnits="userSpaceOnUse" x1="0" y1="26" x2="0" y2="130">' +
        '<stop offset="0" stop-color="' + c.maneLight + '"/>' +
        '<stop offset="1" stop-color="' + c.mane + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-leg" gradientUnits="userSpaceOnUse" x1="0" y1="96" x2="0" y2="160">' +
        '<stop offset="0" stop-color="' + c.base + '"/>' +
        '<stop offset="0.3" stop-color="' + c.leg + '"/>' +
        '<stop offset="1" stop-color="' + c.leg + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-hoof" gradientUnits="userSpaceOnUse" x1="0" y1="148" x2="0" y2="166">' +
        '<stop offset="0" stop-color="' + c.leg + '"/>' +
        '<stop offset="0.25" stop-color="' + c.hoof + '"/>' +
        '<stop offset="1" stop-color="#0b0a0a"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-leather" gradientUnits="userSpaceOnUse" x1="0" y1="58" x2="0" y2="104">' +
        '<stop offset="0" stop-color="#8b4a24"/>' +
        '<stop offset="0.5" stop-color="#5e2f13"/>' +
        '<stop offset="1" stop-color="#3a1c0a"/>' +
      '</linearGradient>' +
      '<linearGradient id="' + id + '-metal" gradientUnits="userSpaceOnUse" x1="0" y1="96" x2="1" y2="118">' +
        '<stop offset="0" stop-color="#f3f5f8"/>' +
        '<stop offset="0.45" stop-color="#a9b0ba"/>' +
        '<stop offset="1" stop-color="#6d747e"/>' +
      '</linearGradient>' +
      '<radialGradient id="' + id + '-muscle" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="30" gradientTransform="translate(90 92) scale(1.15 1.35)">' +
        '<stop offset="0" stop-color="#000" stop-opacity=".2"/>' +
        '<stop offset="1" stop-color="#000" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="' + id + '-muscle2" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="26" gradientTransform="translate(158 90) scale(1 1.2)">' +
        '<stop offset="0" stop-color="#000" stop-opacity=".16"/>' +
        '<stop offset="1" stop-color="#000" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="' + id + '-belly" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="44" gradientTransform="translate(126 116) scale(1.1 .4)">' +
        '<stop offset="0" stop-color="' + c.belly + '" stop-opacity=".5"/>' +
        '<stop offset="1" stop-color="' + c.belly + '" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="' + id + '-sheen" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="70" gradientTransform="translate(120 72) scale(1 .5)">' +
        '<stop offset="0" stop-color="#fff" stop-opacity="' + (c.sheen || 0.18) + '"/>' +
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<pattern id="' + id + '-speckle" width="7" height="7" patternUnits="userSpaceOnUse">' +
        '<circle cx="2" cy="2" r="1.5" fill="#fdfbf6" opacity=".6"/>' +
        '<circle cx="5.2" cy="5" r="1.1" fill="#fdfbf6" opacity=".45"/>' +
        '<circle cx="4" cy="1" r=".7" fill="#2a1b13" opacity=".22"/>' +
      '</pattern>' +
      '<clipPath id="' + id + '-clip">' + bodyShapes(1) + '</clipPath>' +
      '</defs>';
  }

  /* Нога: бедро, пясть, бабка, венчик и копыто. */
  function leg(id, o) {
    var w = o.w;
    var g = 'url(#' + id + '-leg)';
    return '<g class="leg ' + o.cls + '" opacity="' + (o.opacity || 1) + '">' +
      '<path d="' + o.thigh + '" fill="none" stroke="' + g + '" stroke-width="' + (12.2 * w).toFixed(1) + '" stroke-linecap="round"/>' +
      '<path d="' + o.cannon + '" fill="none" stroke="' + g + '" stroke-width="' + (5.8 * w).toFixed(1) + '" stroke-linecap="round"/>' +
      '<path d="' + o.pastern + '" fill="none" stroke="' + g + '" stroke-width="' + (4.7 * w).toFixed(1) + '" stroke-linecap="round"/>' +
      '<circle cx="' + o.knee[0] + '" cy="' + o.knee[1] + '" r="' + (3.9 * w).toFixed(1) + '" fill="' + g + '"/>' +
      '<circle cx="' + o.fet[0] + '" cy="' + o.fet[1] + '" r="' + (3.2 * w).toFixed(1) + '" fill="' + g + '"/>' +
      '<rect x="' + (o.hoof[0] - 5.2 * w).toFixed(1) + '" y="' + (o.hoof[1] - 6).toFixed(1) + '" width="' + (11.2 * w).toFixed(1) + '" height="8.2" rx="2.9" fill="url(#' + id + '-hoof)"/>' +
      '<rect x="' + (o.hoof[0] - 5).toFixed(1) + '" y="' + (o.hoof[1] - 6.6).toFixed(1) + '" width="' + (10.8 * w).toFixed(1) + '" height="2" rx=".9" fill="#e8dcc6" opacity=".34"/>' +
      '</g>';
  }

  /* Сбруя: вальтрап, седло, подпруга, стремя, уздечка и повод. */
  function tack(id, accent, number) {
    var pad = number
      ? '<path d="M 99 70 C 98 82 100 94 103 104 C 113 107 137 107 147 104 C 150 94 151 82 150 70 Z" fill="' + accent + '"/>' +
        '<path d="M 99 70 C 98 82 100 94 103 104 L 109 105 C 106 94 104 82 105 70 Z" fill="#fff" opacity=".22"/>' +
        '<path d="M 103 104 C 113 107 137 107 147 104" stroke="#fff" stroke-width="1.8" fill="none" opacity=".3"/>' +
        '<text x="126" y="93" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="Arial, Helvetica, sans-serif" opacity=".95">' + number + '</text>'
      : '<path d="M 99 70 C 98 82 100 94 103 104 C 113 107 137 107 147 104 C 150 94 151 82 150 70 Z" fill="' + accent + '"/>' +
        '<path d="M 103 104 C 113 107 137 107 147 104" stroke="#fff" stroke-width="1.8" fill="none" opacity=".28"/>';

    return '<g class="tack">' +
      pad +
      // крыло седла
      '<path d="M 111 72 C 109 82 110 92 113 99 C 122 102 134 102 143 99 C 146 92 147 82 145 72 Z" fill="url(#' + id + '-leather)"/>' +
      '<path d="M 114 76 C 113 84 114 92 116 97" stroke="#c8874e" stroke-width="1.1" fill="none" opacity=".45"/>' +
      '<path d="M 142 76 C 143 84 142 92 140 97" stroke="#2a1408" stroke-width="1.2" fill="none" opacity=".5"/>' +
      // подпруга
      '<path d="M 122 94 C 121 103 121 112 121 119 L 131 119 C 131 112 131 103 130 94 Z" fill="url(#' + id + '-leather)"/>' +
      '<path d="M 122 100 h 7 M 122 106 h 7" stroke="#000" stroke-width=".8" opacity=".22"/>' +
      '<rect x="121" y="112" width="10" height="4" rx="1" fill="url(#' + id + '-metal)" opacity=".85"/>' +
      // ленчик
      '<path d="M 106 72 C 106 63 117 57 127 57 C 138 57 148 62 147 71 C 147 79 139 81 130 79 C 120 77 111 77 106 72 Z" fill="url(#' + id + '-leather)"/>' +
      '<path d="M 109 69 C 118 64 133 63 143 68" stroke="#d79b62" stroke-width="1.5" fill="none" opacity=".45" stroke-linecap="round"/>' +
      // лука спереди и сзади
      '<path d="M 143 66 C 149 60 155 65 153 72 C 151 78 145 77 144 72 Z" fill="url(#' + id + '-leather)"/>' +
      '<path d="M 109 70 C 104 65 100 70 102 77 C 104 82 109 80 110 75 Z" fill="url(#' + id + '-leather)"/>' +
      // путлище и стремя
      '<path d="M 127 96 C 127 104 126 110 126 114" stroke="#3d2110" stroke-width="2.6" fill="none"/>' +
      '<path d="M 126 113 C 120 114 118 121 123 124 C 128 126 132 121 131 117" stroke="url(#' + id + '-metal)" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      // уздечка: щёчный ремень, переносье, капсюль
      '<path d="M 197 28 C 204 35 212 44 218 51" stroke="#3b2417" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M 203 29 C 208 33 214 39 219 45" stroke="#5b3a24" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M 224 51 C 231 55 237 60 243 64" stroke="#3b2417" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="231" cy="56" r="1.4" fill="#d8b34a"/>' +
      '<circle cx="224" cy="52" r="1.1" fill="#d8b34a"/>' +
      // удила и кольцо
      '<circle cx="241" cy="64" r="3.4" fill="none" stroke="url(#' + id + '-metal)" stroke-width="1.6"/>' +
      // повод к седлу
      '<path d="M 239 67 C 222 78 204 86 184 90 C 170 92 158 89 150 84" stroke="#4a2c1b" stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
      '</g>';
  }

  /* opts: coat, breed, number, accent, animated, label */
  function svg(opts) {
    var coat = COATS[opts.coat] || COATS.bay;
    var breed = BREEDS[opts.breed] || BREEDS.arabian;
    var accent = opts.accent || '#b8441f';
    var number = opts.number == null || opts.number === '' ? '' : String(opts.number);
    var cls = 'horse-svg' + (opts.animated ? ' is-running' : '');
    var id = 'h' + (++seq);

    var col = {
      top: coat.top, base: coat.base, dark: coat.dark, belly: coat.belly,
      leg: coat.leg, mane: coat.mane, maneLight: coat.maneLight,
      muzzle: coat.muzzle, hoof: coat.hoof, light: coat.light,
      sheen: breed.sheen || (opts.coat === 'black' ? 0.16 : 0.2)
    };

    var w = breed.width || 1;
    var lw = breed.leg || 1;

    var patchLayer = '';
    if (coat.patch) {
      patchLayer = '<g clip-path="url(#' + id + '-clip)">' +
        '<path d="M 78 60 C 96 58 104 72 100 88 C 96 104 78 108 68 96 C 60 84 64 64 78 60 Z" fill="' + coat.patch + '" opacity=".95"/>' +
        '<path d="M 118 100 C 132 96 150 102 152 112 C 154 122 138 126 126 122 C 114 118 108 106 118 100 Z" fill="' + coat.patch + '" opacity=".9"/>' +
        '<path d="M 160 46 C 174 44 186 54 184 66 C 182 78 166 80 158 70 C 151 61 152 48 160 46 Z" fill="' + coat.patch + '" opacity=".85"/>' +
        '<path d="M 56 86 C 62 92 64 102 60 110" stroke="' + coat.patch + '" stroke-width="6" fill="none" opacity=".9"/>' +
        '</g>';
    }
    if (coat.speckle) {
      patchLayer += '<g clip-path="url(#' + id + '-clip)"><rect x="40" y="50" width="220" height="90" fill="url(#' + id + '-speckle)"/></g>';
    }
    if (coat.dapple) {
      var dap = '';
      var spots = [[86, 84], [104, 92], [120, 82], [136, 90], [150, 100], [72, 96], [112, 104], [132, 106], [98, 100]];
      for (var s = 0; s < spots.length; s++) {
        dap += '<ellipse cx="' + spots[s][0] + '" cy="' + spots[s][1] + '" rx="7" ry="5.2" fill="#fff" opacity=".22"/>';
      }
      patchLayer += '<g clip-path="url(#' + id + '-clip)">' + dap + '</g>';
    }
    if (coat.dorsal) {
      patchLayer += '<path d="M 150 66 C 132 62 108 62 88 66 C 74 69 62 76 58 84" stroke="' + coat.dorsal + '" stroke-width="3.2" fill="none" opacity=".8" stroke-linecap="round"/>';
    }

    return '<svg class="' + cls + '" viewBox="0 0 260 170" role="img" aria-label="' +
      (opts.label || (breed.title + ', ' + coat.title.toLowerCase())) + '">' +
      defs(id, col) +
      '<ellipse cx="120" cy="161" rx="70" ry="6" fill="#1e2a22" opacity=".16"/>' +
      '<g transform="' + breed.transform + '">' +

      // дальние ноги (чуть темнее — они в тени)
      leg(id, {
        cls: 'leg-hind-far', w: 1.28 * lw, opacity: .8,
        thigh: 'M 94 100 C 86 112 80 122 80 130', cannon: 'M 80 130 C 86 138 88 144 88 148',
        pastern: 'M 88 148 C 88 152 88 154 88 156',
        knee: [80, 130], fet: [88, 148], hoof: [88, 156]
      }) +
      leg(id, {
        cls: 'leg-front-far', w: 1.28 * lw, opacity: .8,
        thigh: 'M 154 98 C 158 110 160 120 159 127', cannon: 'M 159 127 C 159 136 160 142 161 146',
        pastern: 'M 161 146 C 161 150 161 153 161 156',
        knee: [159, 127], fet: [161, 146], hoof: [161, 156]
      }) +

      // корпус, голова и сбруя подняты — под корпусом длинные ноги
      '<g transform="translate(0 -8)">' +

      // хвост
      '<g class="tail">' + tailShape(breed.mane, id) + '</g>' +

      // корпус
      '<g fill="url(#' + id + '-body)">' + bodyShapes(w) + '</g>' +
      patchLayer +

      // мышцы, тени, блик
      '<g clip-path="url(#' + id + '-clip)">' +
        '<ellipse cx="92" cy="92" rx="30" ry="31" fill="url(#' + id + '-muscle)"/>' +
        '<ellipse cx="158" cy="90" rx="26" ry="27" fill="url(#' + id + '-muscle2)"/>' +
        '<ellipse cx="126" cy="116" rx="46" ry="15" fill="url(#' + id + '-belly)"/>' +
        '<ellipse cx="120" cy="72" rx="70" ry="26" fill="url(#' + id + '-sheen)"/>' +
        '<path d="M 92 70 C 110 62 140 62 158 70" stroke="' + col.light + '" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/>' +
        '<path d="M 160 72 C 168 60 178 48 190 40" stroke="' + col.light + '" stroke-width="4" fill="none" opacity=".25" stroke-linecap="round"/>' +
      '</g>' +
      '<path d="M 152 76 C 160 88 162 98 156 106" stroke="' + col.dark + '" stroke-width="2" fill="none" opacity=".16" stroke-linecap="round"/>' +
      '<path d="M 92 78 C 84 90 84 100 90 108" stroke="' + col.dark + '" stroke-width="2" fill="none" opacity=".14" stroke-linecap="round"/>' +

      // грива и чёлка
      maneShape(breed.mane, id) +

      // голова: щека, глаз, ноздря, уши, рот
      '<path d="M 197 34 C 203 44 211 52 220 57 C 213 61 205 57 200 50 C 195 44 194 38 195 35 Z" fill="' + col.dark + '" opacity=".16"/>' +
      '<ellipse cx="211" cy="40" rx="3.1" ry="2.8" fill="#1d140e"/>' +
      '<circle cx="210" cy="39" r=".95" fill="#fff" opacity=".85"/>' +
      '<path d="M 206 37 C 209 34 214 34 216 37" stroke="' + col.mane + '" stroke-width="1.2" fill="none" opacity=".65" stroke-linecap="round"/>' +
      '<ellipse cx="241" cy="63" rx="2" ry="1.5" fill="' + col.muzzle + '" transform="rotate(30 241 63)"/>' +
      '<path d="M 242 69 C 245 70 245 72 242 72" stroke="' + col.muzzle + '" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M 193 25 C 190 17 191 10 195 7 C 199 10 201 17 201 25 Z" fill="url(#' + id + '-body)"/>' +
      '<path d="M 195 10 C 196 15 197 20 197 24" stroke="' + col.muzzle + '" stroke-width="1.5" fill="none" opacity=".4" stroke-linecap="round"/>' +
      '<path d="M 185 28 C 182 21 183 14 187 11 C 191 14 193 21 193 27 Z" fill="' + col.mane + '" opacity=".95"/>' +
      forelock(id) +

      // сбруя
      tack(id, accent, number) +

      '</g>' +

      // ближние ноги
      leg(id, {
        cls: 'leg-hind-near', w: 1.6 * lw,
        thigh: 'M 100 98 C 90 110 82 120 82 129', cannon: 'M 82 129 C 88 137 90 143 90 147',
        pastern: 'M 90 147 C 90 151 90 154 90 157',
        knee: [82, 129], fet: [90, 147], hoof: [90, 157]
      }) +
      leg(id, {
        cls: 'leg-front-near', w: 1.6 * lw,
        thigh: 'M 160 96 C 166 108 168 119 167 127', cannon: 'M 167 127 C 167 136 168 142 169 146',
        pastern: 'M 169 146 C 169 150 169 154 169 157',
        knee: [167, 127], fet: [169, 146], hoof: [169, 157]
      }) +

      '</g></svg>';
  }

  /* Стог сена — его дарят лошади, дошедшей первой. */
  function haystack() {
    var straw = '';
    for (var i = 0; i < 20; i++) {
      var x = 12 + (i * 6.2) % 74;
      var y = 46 + ((i * 13) % 24);
      straw += '<path d="M ' + x + ' ' + y + ' l ' + (4 + (i % 3) * 3) + ' ' + (-3 - (i % 4)) + '" stroke="#a9741b" stroke-width="1.1" opacity=".5" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 100 74" role="img" aria-label="Стог сена">' +
      '<ellipse cx="50" cy="68" rx="30" ry="4" fill="#000" opacity=".16"/>' +
      '<path d="M 14 64 C 14 40, 28 24, 50 22 C 72 24, 86 40, 86 64 Z" fill="#e8b93f"/>' +
      '<path d="M 14 64 C 14 46, 22 32, 34 26 C 34 40, 28 52, 26 64 Z" fill="#f2cd67" opacity=".9"/>' +
      '<path d="M 86 64 C 86 46, 78 32, 66 26 C 66 40, 72 52, 74 64 Z" fill="#d9a52c" opacity=".85"/>' +
      '<ellipse cx="50" cy="24" rx="16" ry="6" fill="#f6d97e"/>' +
      straw +
      '<path d="M 22 64 h 56" stroke="#a9741b" stroke-width="2" opacity=".5" stroke-linecap="round"/>' +
      '</svg>';
  }

  function swatch(coatKey) {
    var c = COATS[coatKey] || COATS.bay;
    return '<span class="swatch" style="background:linear-gradient(135deg,' + c.top + ' 0%,' + c.base + ' 52%,' + c.mane + ' 52%,' + c.mane + ' 100%)"></span>';
  }

  return { COATS: COATS, BREEDS: BREEDS, svg: svg, swatch: swatch, haystack: haystack };
})();
