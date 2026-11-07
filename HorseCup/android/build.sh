#!/usr/bin/env bash
set -euo pipefail
# Usage: build.sh /path/to/android.jar /path/to/build-tools /private/horsecup.p12
# Password is provided only through HORSECUP_SIGNING_PASSWORD.
android_platform_jar="${1:?Android platform android.jar required}"
android_build_tools="${2:?Android build-tools directory required}"
horsecup_keystore="${3:?Private signing keystore required}"
: "${HORSECUP_SIGNING_PASSWORD:?Set the signing password in the environment}"
project_dir="$(cd "$(dirname "$0")" && pwd)"
build_dir="$project_dir/build"
mkdir -p "$build_dir/classes" "$build_dir/dex" "$project_dir/../downloads"
java com.sun.tools.javac.Main -source 8 -target 8 -encoding UTF-8 -classpath "$android_platform_jar" -d "$build_dir/classes" "$project_dir/src/kz/tomorrowschool/horsecup/MainActivity.java"
jar_path="$build_dir/classes.jar"
python3 - "$build_dir/classes" "$jar_path" <<'PY'
import sys,zipfile,pathlib
root=pathlib.Path(sys.argv[1])
with zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED) as z:
 for p in root.rglob('*.class'):z.write(p,p.relative_to(root))
PY
java -cp "$android_build_tools/lib/d8.jar" com.android.tools.r8.D8 --min-api 26 --lib "$android_platform_jar" --output "$build_dir/dex" "$jar_path"
"$android_build_tools/aapt" package -f -M "$project_dir/AndroidManifest.xml" -S "$project_dir/res" -I "$android_platform_jar" -F "$build_dir/unsigned.apk"
python3 - "$build_dir/unsigned.apk" "$build_dir/dex/classes.dex" <<'PY'
import sys,zipfile
with zipfile.ZipFile(sys.argv[1],'a',zipfile.ZIP_DEFLATED) as z:z.write(sys.argv[2],'classes.dex')
PY
"$android_build_tools/zipalign" -f 4 "$build_dir/unsigned.apk" "$build_dir/aligned.apk"
java -jar "$android_build_tools/lib/apksigner.jar" sign --ks "$horsecup_keystore" --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true --ks-key-alias horsecup --ks-pass env:HORSECUP_SIGNING_PASSWORD --out "$project_dir/../downloads/HorseCup-1.1.apk" "$build_dir/aligned.apk"
java -jar "$android_build_tools/lib/apksigner.jar" verify --verbose "$project_dir/../downloads/HorseCup-1.1.apk"
