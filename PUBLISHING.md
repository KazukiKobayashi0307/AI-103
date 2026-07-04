# Azure AI-103 対策アプリ — Vercel → TWA → Google Play 公開手順

このディレクトリには、Vercel へのデプロイから TWA (Trusted Web Activity) 化、Google Play への公開までに必要なファイル一式が揃っています。このマシンには Node.js が無いため、**PWABuilder.com（ブラウザだけで完結・インストール不要）** を使う手順にしています。

## 用意済みのファイル

| ファイル/ディレクトリ | 役割 |
|---|---|
| `index.html`, `questions*.js`, `glossary.js` | アプリ本体 |
| `manifest.webmanifest` | PWA マニフェスト（アイコン・テーマ色・表示モード） |
| `sw.js` | サービス ワーカー（オフライン シェル キャッシュ、PWA インストール要件） |
| `icons/icon-192.png` `icon-512.png` | 通常アイコン（角丸・透過済み） |
| `icons/icon-maskable-512.png` | Android アダプティブ アイコン用（安全域を確保して生成済み） |
| `icons/playstore-icon-512.png` | Play Console の「高解像度アイコン」にそのまま使用可 |
| `icons/feature-graphic-1024x500.png` | Play Store の「フィーチャー グラフィック」（必須アセット） |
| `.well-known/assetlinks.json` | TWA のデジタル アセット リンク検証用（**要・値の書き換え。手順4参照**） |
| `vercel.json` | マニフェスト/サービス ワーカーの Content-Type・キャッシュ ヘッダー |
| `.vercelignore` / `.gitignore` | ビルド用スクリプトや元画像をデプロイ/コミット対象から除外 |
| `build-icons.ps1` / `build-feature-graphic.ps1` | アイコン・フィーチャー グラフィックの再生成スクリプト（元画像を差し替えたら再実行） |

ローカルの git リポジトリは初期化・コミット済みです（まだリモートへの push は行っていません）。

---

## 手順1: GitHub にプッシュ（推奨・自動デプロイのため）

```bash
cd C:\Users\81909\AzureAI103
# GitHub 上に空のリポジトリを作成してから:
git remote add origin https://github.com/<あなたのアカウント>/azure-ai103-app.git
git branch -M main
git push -u origin main
```

以降、`questions*.js` を追加してコミット→push するだけで Vercel が自動的に再デプロイします（問題を増やしていく運用に最適）。

## 手順2: Vercel にデプロイ

1. https://vercel.com にサインイン（GitHub アカウントでOK）
2. 「Add New...」→「Project」→ 先ほどの GitHub リポジトリを Import
3. Framework Preset は **Other**（静的サイトなのでビルド設定不要、Build Command は空でOK）
4. Deploy を実行 → `https://azure-ai103-app.vercel.app`（例）のような URL が発行される
5. 発行された URL に実際にアクセスして、アプリが正常に動くこと・`/manifest.webmanifest` や `/sw.js` が 200 で返ることを確認

> GitHub を使わない場合: vercel.com の「Deploy」画面でフォルダをドラッグ＆ドロップする方法（Git 不要）でも可。ただし以後の更新は毎回手動アップロードが必要になるため、GitHub 連携を推奨します。

## 手順3: PWABuilder で Android パッケージ(TWA)を生成

1. https://www.pwabuilder.com を開き、手順2で得た Vercel の URL を入力して「Start」
2. マニフェスト・サービス ワーカー・アイコンが自動検出され、PWA スコアが表示される（既に一式揃えてあるので高スコアのはず）
3. 「Package For Stores」→「Android」を選択
4. パッケージ名（例: `com.yourname.ai103exam`）・アプリ名・バージョンを設定
5. 署名鍵は PWABuilder に自動生成させるのが簡単（「Generate new signing key」）。**ダウンロードされる `signing-key-info.txt`（または `.keystore` ファイル）は絶対に無くさないこと**（Play Store の更新時に必ず必要になる）
6. 生成された ZIP をダウンロードすると、AAB ファイル（`app-release-bundle.aab`）と、その署名鍵に対応する **SHA-256 フィンガープリント** が含まれています

## 手順4: assetlinks.json を実際の値に更新して再デプロイ

手順3で得た SHA-256 フィンガープリントとパッケージ名を、このプロジェクトの `.well-known/assetlinks.json` に反映します。

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.yourname.ai103exam",
      "sha256_cert_fingerprints": ["AA:BB:CC:...（PWABuilderが表示した値）"]
    }
  }
]
```

書き換えたら commit → push（Vercel が自動再デプロイ）。デプロイ後、ブラウザで
`https://<あなたのドメイン>/.well-known/assetlinks.json` にアクセスして正しく JSON が返ることを確認してください。

## 手順5: Google Play Console でアプリを公開

1. https://play.google.com/console でデベロッパー登録（初回のみ $25 の登録料）
2. 「アプリを作成」→ 手順3でダウンロードした AAB（`app-release-bundle.aab`）をアップロード
3. ストア掲載情報を入力:
   - アプリ アイコン: `icons/playstore-icon-512.png`
   - フィーチャー グラフィック: `icons/feature-graphic-1024x500.png`
   - スクリーンショット: 実機または PWABuilder が生成した TWA アプリを実際に起動してキャプチャ（最低2枚、縦長のスマホ画面推奨）
   - 説明文・カテゴリ（教育）・プライバシー ポリシー URL などを入力
4. 「App content」でコンテンツ レーティングやプライバシー情報を回答
5. 内部テスト → 段階的に公開範囲を広げるのが安全（いきなり本番公開しない）
6. Play Console の「デジタル アセット リンクの検証」で assetlinks.json が正しく認識されているか確認してから本番リリース

## 更新運用（問題を増やすたびに）

1. `questionsN.js` を追加/編集
2. `index.html` の `<script src="questionsN.js">` 読み込みを追加
3. commit → push（Vercel が自動反映、Web版は即反映）
4. **Android アプリ側（TWA）はストア審査不要でコンテンツが更新される**——TWA は実質「アプリの皮を被ったブラウザ」なので、Web側を更新するだけで Android アプリの表示内容も自動的に最新化されます（AAB の再アップロードは、アイコン変更やアプリ名変更など「アプリの殻」自体を変えたいときだけ必要）。

## アイコンを差し替えたくなったら

`icons/_source_master.png`（gitignore 済み・手元にのみ存在）を新しい画像に差し替えてから:

```powershell
powershell -File C:\Users\81909\AzureAI103\build-icons.ps1
powershell -File C:\Users\81909\AzureAI103\build-feature-graphic.ps1
```

を再実行すれば、`icons/` 配下が全サイズ再生成されます。
