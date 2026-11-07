package kz.tomorrowschool.horsecup;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

/** Standalone Android launcher: only the HTTPS HorseCup origin is loaded inside it. */
public final class MainActivity extends Activity {
    private static final String HOME = "https://horsecup-daniella.onrender.com/";
    private static final String HOST = "horsecup-daniella.onrender.com";
    private WebView web;
    private ProgressBar progress;
    private boolean errorShown;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(247,244,233));
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            v.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                         insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets.consumeSystemWindowInsets();
        });
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(247,244,233));
        root.addView(web, new FrameLayout.LayoutParams(-1,-1));
        progress = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        root.addView(progress, new FrameLayout.LayoutParams(-1, Math.round(3*getResources().getDisplayMetrics().density)));
        setContentView(root);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setSafeBrowsingEnabled(true);
        settings.setSupportMultipleWindows(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setUserAgentString(settings.getUserAgentString()+" HorseCupAndroid/1.1");
        CookieManager.getInstance().setAcceptThirdPartyCookies(web,false);
        web.setWebChromeClient(new WebChromeClient(){
            @Override public void onProgressChanged(WebView view,int value){
                progress.setProgress(value); progress.setVisibility(value==100?View.GONE:View.VISIBLE);
            }
        });
        web.setWebViewClient(new WebViewClient(){
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request){
                Uri url=request.getUrl();
                if(("horsecup-share".equals(url.getScheme())||"horsecup-copy".equals(url.getScheme()))&&request.hasGesture()){
                    String room=url.getQueryParameter("room");
                    if(room!=null&&room.matches("[0-9]{6}")){
                        if("horsecup-copy".equals(url.getScheme())){
                            ClipboardManager clipboard=(ClipboardManager)getSystemService(CLIPBOARD_SERVICE);
                            clipboard.setPrimaryClip(ClipData.newPlainText("Номер комнаты",room));
                            Toast.makeText(MainActivity.this,"Номер комнаты скопирован",Toast.LENGTH_SHORT).show();
                        }else{
                            Intent share=new Intent(Intent.ACTION_SEND);share.setType("text/plain");
                            share.putExtra(Intent.EXTRA_TEXT,"Присоединяйся к HorseCup! Комната "+room+"\n"+HOME+"?room="+room);
                            startActivity(Intent.createChooser(share,"Поделиться комнатой"));
                        }
                    }
                    return true;
                }
                if("https".equals(url.getScheme())&&HOST.equals(url.getHost()))return false;
                if("https".equals(url.getScheme())){
                    try{startActivity(new Intent(Intent.ACTION_VIEW,url));}catch(Exception ignored){}
                }else Toast.makeText(MainActivity.this,"Эта ссылка не поддерживается",Toast.LENGTH_SHORT).show();
                return true;
            }
            @Override public void onPageStarted(WebView view,String url,android.graphics.Bitmap icon){errorShown=false;}
            @Override public void onReceivedError(WebView view,WebResourceRequest request,WebResourceError error){
                if(request.isForMainFrame())showConnectionError();
            }
            @Override public void onReceivedHttpError(WebView view,WebResourceRequest request,WebResourceResponse response){
                if(request.isForMainFrame()&&response.getStatusCode()>=400)showConnectionError();
            }
        });
        if(savedInstanceState==null||web.restoreState(savedInstanceState)==null)web.loadUrl(initialUrl(getIntent()));
    }
    private String initialUrl(Intent intent){
        Uri data=intent.getData();
        return data!=null&&"https".equals(data.getScheme())&&HOST.equals(data.getHost())?data.toString():HOME;
    }
    @Override protected void onNewIntent(Intent intent){super.onNewIntent(intent);setIntent(intent);web.loadUrl(initialUrl(intent));}
    private void showConnectionError(){
        if(errorShown||isFinishing())return;errorShown=true;
        new AlertDialog.Builder(this).setTitle("Нет соединения с HorseCup")
            .setMessage("Для игры нужен интернет. При первом открытии серверу может понадобиться время для запуска.")
            .setPositiveButton("Повторить",(dialog,which)->{errorShown=false;web.loadUrl(HOME);})
            .setNegativeButton("Закрыть",(dialog,which)->finish()).show();
    }
    @Override public void onSaveInstanceState(Bundle state){web.saveState(state);super.onSaveInstanceState(state);}
    @Override public void onBackPressed(){
        if(web.canGoBack()){web.goBack();return;}
        new AlertDialog.Builder(this).setTitle("Выйти из HorseCup?")
            .setMessage("Время начатого заезда продолжает идти.")
            .setPositiveButton("Выйти",(dialog,which)->finish()).setNegativeButton("Остаться",null).show();
    }
    @Override protected void onDestroy(){if(web!=null){web.stopLoading();web.destroy();}super.onDestroy();}
}
