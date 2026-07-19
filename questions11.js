/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ11 (q231-q255)
 *  出典: Udemy掲載のAI-103対策講座（ユーザー提供の25問を再構成、第3弾）。
 *  source:"Udemy AI-103" を付与。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q231", domain:"vision", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある開発者が Image Analysis 4.0 API を呼び出し、画像全体の自然言語説明1つと、最大10領域のバウンディングボックス付き説明の両方を取得したいと考えています。リクエストでどの機能を指定すべきですか？",
  choices:[
    { t:"tags と object detection", c:false, e:"本来これらは物体・シーンラベルと物体バウンディングボックスを返す機能であり、自然言語による説明文は返さない。" },
    { t:"caption と dense captions", c:true, e:"正解。captionは画像全体の自然言語説明を1つ返し、dense captionsは最大10領域分の領域単位の説明をバウンディングボックス付きで返す。" },
    { t:"caption と people detection", c:false, e:"本来people detectionは人物の位置のバウンディングボックスを追加する機能であり、領域ごとの説明文ではない。" },
    { t:"read と smart crops", c:false, e:"本来readはOCRのテキスト抽出、smart cropsは推奨クロップ矩形を返す機能であり、画像説明とは無関係。" }
  ],
  summary:"画像全体の説明1つ+領域ごとの説明（最大10）＝caption＋dense captions。tags/object detection/people detection/read/smart cropsはいずれも別の出力形式。",
  keywords:[
    { k:"Image Analysis 4.0 の視覚機能（キャプション/密集キャプション/タグ/物体/人物/スマート クロップ/背景除去）", d:"captionとdense captionsの役割。" }
  ]
},
{
  id:"q232", domain:"vision", type:"single", source:"Udemy AI-103",
  q:"ある開発者が PNG 画像を Image Analysis 4.0 API に URL として送信したところエラーが発生しました。画像サイズは30 MBです。失敗の最も可能性の高い原因は何ですか？",
  choices:[
    { t:"PNG 形式は Image Analysis 4.0 でサポートされていない", c:false, e:"本来PNGはサポート形式として明示的にリストされている。形式が原因ではない。" },
    { t:"URL 入力に対する20 MBの最大ファイルサイズを超えている", c:true, e:"正解。Image Analysis 4.0 APIはURL入力に対する最大ファイルサイズを20 MBに強制しており、30 MBの画像はこの上限を超える。" },
    { t:"画像 URL は HTTPS でなければならず、HTTP URL は拒否される", c:false, e:"本来一部のAPIでは妥当な制限だが、本問はサイズが明らかな問題であり、この制限が原因ではない。" },
    { t:"画像の寸法が16,000 x 16,000ピクセルの上限を超えている", c:false, e:"本来これは寸法が16,000 x 16,000ピクセルを超えた場合に該当する制限だが、本問はサイズ(MB)を指定しており、寸法上限の話ではない。" }
  ],
  summary:"URL入力30MBの画像でエラー＝20MBの最大ファイルサイズ超過。PNG非対応/HTTPS必須/寸法上限はいずれも本問の原因ではない。",
  keywords:[
    { k:"Image Analysis 4.0 の視覚機能（キャプション/密集キャプション/タグ/物体/人物/スマート クロップ/背景除去）", d:"URL入力のファイルサイズ上限。" }
  ]
},
{
  id:"q233", domain:"vision", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Read API の非同期パスを使ってマルチページ PDF を処理し、結果をポーリングする必要があります。POST リクエストを送信した後、開発者は完了をポーリングするための URL をどこで見つけられますか？",
  choices:[
    { t:"JSON レスポンスボディの 'status_url' フィールド", c:false, e:"本来このAPIではポーリングURLはレスポンスボディに返されない。" },
    { t:"HTTP レスポンスの 'operation-location' ヘッダー", c:true, e:"正解。非同期Read APIは、HTTPレスポンスにoperation-locationヘッダーを返し、その値が操作のステータスと結果をポーリングするためのURLになる。" },
    { t:"元のエンドポイント URL とジョブ ID を組み合わせて URL を構築する", c:false, e:"本来ジョブID形式を別途知っている必要があり、APIはそのように設計されていない。" },
    { t:"HTTP レスポンスの 'Location' ヘッダー", c:false, e:"本来これは標準的なHTTPリダイレクトヘッダーであり、Read APIは特に'operation-location'を使う。" }
  ],
  summary:"非同期Read APIのポーリング先＝HTTPレスポンスの'operation-location'ヘッダー。レスポンスボディ/自前構築/'Location'ヘッダーはいずれも誤り。",
  keywords:[
    { k:"非同期 REST API のポーリング パターン（operation-location ヘッダー）", d:"operation-locationヘッダーの役割。" }
  ]
},
{
  id:"q234", domain:"vision", type:"single", source:"Udemy AI-103",
  q:"ある小売企業が、店舗棚画像から自社製品 SKU を認識するカスタム物体検出モデルを Image Analysis 4.0 で学習させます。トレーニングデータセットはどのアノテーション形式を使う必要がありますか？",
  choices:[
    { t:"Azure File Share に保存された Pascal VOC XML 形式", c:false, e:"本来これは他ツール向けの有効なアノテーション形式だが、Image Analysis 4.0のカスタム学習で必須となる形式ではない。" },
    { t:"Azure Blob Storage に保存された COCO 形式 JSON データセット", c:true, e:"正解。Azure Vision Image Analysis 4.0のカスタムモデル学習はAzure Blob Storageに保存されたCOCO形式JSONデータセットを必要とし、マニフェストにはSASトークン付きBlob URLとしての画像URIとバウンディングボックスアノテーションがリストされる。" },
    { t:"base64 エンコード画像を含む LabelMe JSON 形式", c:false, e:"本来これは本サービスでサポートされていない形式。" },
    { t:"image_url, class_label, x, y, width, height の列を持つ CSV", c:false, e:"本来これはModel Customization APIでサポートされていない簡略化されたテーブル形式。" }
  ],
  summary:"Image Analysis 4.0のカスタム物体検出学習＝Azure Blob StorageのCOCO形式JSONデータセット。Pascal VOC/LabelMe/CSVはいずれも非対応。",
  keywords:[
    { k:"Image Analysis 4.0 のカスタム モデル学習（COCO 形式 JSON / Model Customization API / modelName）と Custom Vision との違い", d:"COCO形式JSONデータセットの要件。" }
  ]
},
{
  id:"q235", domain:"vision", type:"single", source:"Udemy AI-103",
  q:"あるメディア企業が Azure Video Indexer でインタビュー録画を処理し、各話者の名前付き文字起こしを取得する必要があります。VI のどのインサイト種別がこれを提供しますか？",
  choices:[
    { t:"Visual labels (視覚ラベル)", c:false, e:"本来これは動画フレーム内のシーン物体を識別する機能であり、発話内容ではない。" },
    { t:"OCR インサイト", c:false, e:"本来これは画面上のテキストを抽出する機能であり、発話単語ではない。" },
    { t:"話者ダイアライゼーションと顔認識付きトランスクリプト", c:true, e:"正解。Video Indexerは話者ダイアライゼーション付きトランスクリプトを生成し、異なる話者を識別する。さらに名前付き顔認識を組み合わせ、顔プロファイルが登録されている場合は話者を名前で識別できる。" },
    { t:"キーフレーム抽出", c:false, e:"本来これはサムネイル用に代表的なフレームを抽出する機能であり、トランスクリプトではない。" }
  ],
  summary:"各話者の名前付き文字起こし＝話者ダイアライゼーション＋顔認識付きトランスクリプト。視覚ラベル/OCRインサイト/キーフレーム抽出はいずれも別の情報を返す。",
  keywords:[
    { k:"Video Indexer と 空間分析（Spatial Analysis）", d:"話者ダイアライゼーション付きトランスクリプト。" }
  ]
},
{
  id:"q236", domain:"vision", type:"single", source:"Udemy AI-103",
  q:"ある開発者が、「赤いスポーツカー」のように入力すると、ギャラリーから視覚的に最も合致する画像を返すクロスモーダルな画像とテキストの類似検索を有効化したいと考えています。Image Analysis 4.0 のどの機能がこれをサポートしますか？",
  choices:[
    { t:"dense captions で画像領域ごとに生成した説明文を Read OCR のテキスト埋め込みと突き合わせ、領域単位のキャプション一致度で並べ替える", c:false, e:"本来これはテキスト記述を生成し別途埋め込み比較できる2段階の回避策であり、統合的なクロスモーダル埋め込みではない。" },
    { t:"Vectorize Image と Vectorize Text エンドポイントによるマルチモーダル埋め込み", c:true, e:"正解。Image Analysis 4.0はVectorize ImageとVectorize Textエンドポイント経由でマルチモーダル埋め込みを提供し、画像とテキストを同一のセマンティックベクトル空間にマップしてクロスモーダル類似検索を可能にする。" },
    { t:"物体検出で検出したバウンディングボックスのクラスラベルを、入力語に対する完全一致のラベルマッチングで照合し、ヒットした矩形を含む画像のみを返す", c:false, e:"本来これはラベル付きバウンディングボックスを提供するが、セマンティック埋め込み空間ではない。" },
    { t:"smart crops で各画像に最適な切り抜き矩形を求め、アスペクト比フィルタリングで指定比率に合致するサムネイル候補だけを類似結果として並べる", c:false, e:"本来これは画像クロップ提案用の機能であり、類似検索とは無関係。" }
  ],
  summary:"クロスモーダルな画像・テキスト類似検索＝Vectorize Image/Vectorize Textによるマルチモーダル埋め込み。dense captions比較/ラベルマッチング/smart cropsはいずれも代替にならない。",
  keywords:[
    { k:"Image Analysis 4.0 の視覚機能（キャプション/密集キャプション/タグ/物体/人物/スマート クロップ/背景除去）", d:"Vectorize Image/Textによるクロスモーダル検索。" }
  ]
},
{
  id:"q237", domain:"vision", type:"multi", source:"Udemy AI-103",
  q:"ある開発者が Image Analysis 4.0 でカスタム画像分類モデルを学習させます。Image Analysis 4.0 のカスタムモデル学習に関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"カスタムモデルの学習には別個の Custom Vision サービスリソースが必要である", c:false, e:"本来Image Analysis 4.0ではカスタムモデルはAzure AI Visionリソース内で学習され、別個のCustom Visionサービスは不要になった。" },
    { t:"カスタムモデルは Model Customization API 経由で Azure AI Vision リソース内で学習される", c:true, e:"正解。カスタムモデル学習はAzure AI Visionリソース内でModel Customization APIまたはFoundry Tools UIを介して実行される。" },
    { t:"インクリメンタルトレーニング (既存モデルへのクラス追加) は直接サポートされている", c:false, e:"本来インクリメンタルトレーニングは直接サポートされておらず、結合した全データセットで再学習する必要がある。" },
    { t:"学習後、カスタムモデルは modelName パラメータ付きで同じ Analyze Image API を使って呼び出される", c:true, e:"正解。カスタムモデル推論はmodelNameパラメータでカスタムモデル名を指定して同じAnalyze Image APIを使う。" },
    { t:"トレーニングデータは Pascal VOC XML 形式である必要がある", c:false, e:"本来必要な形式はAzure Blob Storageに保存されたCOCO形式JSON。" }
  ],
  summary:"Image Analysis 4.0のカスタム学習＝Azure AI Visionリソース内でModel Customization API、推論はmodelNameパラメータ付きの同じAnalyze Image API。別リソース必須/インクリメンタル対応/Pascal VOCはいずれも誤り。",
  keywords:[
    { k:"Image Analysis 4.0 のカスタム モデル学習（COCO 形式 JSON / Model Customization API / modelName）と Custom Vision との違い", d:"学習場所と推論方法。" }
  ]
},
{
  id:"q238", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"あるユーザーレビューの中で「the battery life (バッテリー寿命)」が言及され、それに対して特にネガティブな感情が表明されていることを (文書全体のセンチメントだけでなく) 識別したいと考えています。どの Azure AI Language 機能を使うべきですか？",
  choices:[
    { t:"標準センチメント分析を文書全体に適用する", c:false, e:"本来これは文書全体および文単位のセンチメントを返すが、特定のターゲット実体とそれに対する感情は識別しない。" },
    { t:"キーフレーズ抽出で語句を列挙する", c:false, e:"本来これは重要なフレーズを抽出するが、特定のアスペクトとセンチメントを関連付けない。" },
    { t:"オピニオンマイニング (アスペクトベースのセンチメント)", c:true, e:"正解。オピニオンマイニングはopinionMining=trueを渡すことで有効化され、製品機能などのターゲット実体を特定し、target、assessment、sentimentの三項組を返すため、「battery life」をターゲットとし負のセンチメントとして識別できる。" },
    { t:"固有表現抽出でエンティティを分類する", c:false, e:"本来これは実体カテゴリを認識するが、それらの実体にセンチメントを関連付けない。" }
  ],
  summary:"特定の対象への感情を識別＝オピニオンマイニング(target/assessment/sentimentの三項組)。標準センチメント分析/キーフレーズ抽出/固有表現抽出はいずれもアスペクト単位のセンチメントを返さない。",
  keywords:[
    { k:"感情分析の集約ルール と オピニオン マイニング", d:"オピニオンマイニングのtarget/assessment/sentiment。" }
  ]
},
{
  id:"q239", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"あるコンプライアンスチームが法的文書を処理し、保管前に SSN、クレジットカード番号、パスポート番号を伏せ字化する必要があります。どの Azure AI Language 機能と機能性を使うべきですか？",
  choices:[
    { t:"実体カテゴリフィルタを Person と Organization に絞った固有表現抽出", c:false, e:"本来NERはPersonとOrganizationを認識するが、SSNやクレジットカード番号のような金融識別子を特に対象とせず、リダクションも行わない。" },
    { t:"リダクションを有効化し、必要な PII カテゴリにフィルタリングした PII 検出", c:true, e:"正解。PII検出はSSN、パスポート番号、クレジットカード番号を含む33種類のPIIカテゴリを認識し、指定カテゴリにフィルタでき、出力テキスト中の検出されたPIIのリダクションをサポートする。" },
    { t:"キーフレーズ抽出と、合致する用語を除去する後処理", c:false, e:"本来これは重要フレーズ抽出用であり、ターゲットを定めたリダクションには使えない。" },
    { t:"機微な詳細を含まないバージョンを生成する抽象的要約", c:false, e:"本来これは文書の内容と文脈を失うことになり、選択的な伏せ字化ではない。" }
  ],
  summary:"SSN/クレジットカード/パスポート番号の伏せ字化＝リダクション有効化+カテゴリフィルタ済みPII検出(33カテゴリ)。NER/キーフレーズ抽出/抽象的要約はいずれも不適切。",
  keywords:[
    { k:"Language 機能の使い分け（キー フレーズ / 要約 / NER / PII / エンティティ リンク）", d:"PII検出のリダクション機能。" }
  ]
},
{
  id:"q240", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"あるローカライゼーションチームが、200 ページの Word 文書を英語から日本語に元の書式を保持したまま翻訳したいと考えています。どの Azure AI Translator 機能と入力メカニズムを使うべきですか？",
  choices:[
    { t:"文書本文をプレーンテキストとして抽出し文字列をリクエスト本文に貼り付けて逐次送信する Text Translation API を使う", c:false, e:"本来APIがプレーンテキスト文字列を扱うため、すべての書式が失われる。" },
    { t:"ソースとターゲットの Azure Blob Storage コンテナ URI を使う Document Translation バッチ API", c:true, e:"正解。Document TranslationはソースとターゲットのAzure Blob Storageコンテナ URIを受け取り、Word(.docx)形式の書式を保持したまま翻訳し、翻訳された文書をターゲットコンテナに書き込む非同期バッチAPIを使用する。" },
    { t:"ドメイン固有の対訳コーパスで学習し業界用語の訳語品質を高めた Custom Translator のカスタムモデルを使う", c:false, e:"本来これはドメイン固有の用語精度を高めるものであり、書式付き文書の翻訳要件を単独では満たさない。" },
    { t:"ラテン文字の表記を日本語の仮名・漢字表記へ規則に基づき音写変換する Transliteration API を使う", c:false, e:"本来これは言語を変えずに表記を変換するものであり、求められていることの逆になる。" }
  ],
  summary:"200ページのWord文書を書式保持で一括翻訳＝ソース/ターゲットBlobコンテナURIを使うDocument Translationバッチ API。Text Translation/Custom Translator/Transliterationはいずれも不十分。",
  keywords:[
    { k:"Translator の機能（テキスト/ドキュメント/音訳/辞書/カスタム）と BLEU", d:"Document Translationのコンテナ URI入力。" }
  ]
},
{
  id:"q241", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Azure Speech を使って対話型音声アシスタントを構築しており、音声入出力会話のエンドツーエンドのレイテンシを最小化したいと考えています。どのアプローチを使うべきですか？",
  choices:[
    { t:"SpeechRecognizer → chat completions コール → SpeechSynthesizer の逐次パイプライン", c:false, e:"本来これは標準的なSTT-LLM-TTSパイプラインで、3つの逐次APIコールにわたって累積的にレイテンシが追加される。" },
    { t:"WebSocket 接続を使った GPT-4o Realtime API による統合的な音声入出力", c:true, e:"正解。GPT-4o Realtime APIはWebSocket接続上の統合ストリームとして音声入力を処理して音声出力を生成し、エンドツーエンドのレイテンシを1秒未満に短縮する。" },
    { t:"録音音声のバッチ文字起こし → LLM 完了 → TTS", c:false, e:"本来これはオフラインバッチ処理用であり、リアルタイム音声アシスタントには適さない。" },
    { t:"Azure Bot Service ボットと統合された Speech SDK の DirectLine チャネル", c:false, e:"本来これはレイテンシ削減ではなく追加のレイテンシをもたらすボットフレームワーク統合パターン。" }
  ],
  summary:"音声会話のエンドツーエンドレイテンシ最小化＝WebSocket接続のGPT-4o Realtime APIによる統合音声入出力。逐次パイプライン/バッチ文字起こし/DirectLineはいずれもレイテンシが大きい。",
  keywords:[
    { k:"GPT-4o Realtime API（WebSocket音声入出力）と従来のSTT→LLM→TTSパイプライン", d:"統合ストリームによるレイテンシ短縮。" }
  ]
},
{
  id:"q242", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"ある金融サービス会社が「EBITDA」「YoY」「Q3FY26」のような専門略語を含む決算説明会を文字起こししています。ベース Speech モデルはこれらの用語を誤認識します。最もコスト効率の良い Custom Speech のトレーニングデータアプローチはどれですか？",
  choices:[
    { t:"100 時間分の決算説明会音声と人手ラベル付き文字起こしを集めて音響モデルを適応させる", c:false, e:"本来これは大量の音声データ収集を必要とし最もコストが高い。主に音響不一致に対応するもので、用語認識が主目的ではない。" },
    { t:"ドメイン固有用語を含むプレーンテキスト文を提供して言語モデルを適応させる", c:true, e:"正解。プレーンテキスト適応は最も少ないデータで済み最もコスト効率が良く、ドメイン固有用語を含む代表的な文で言語モデルを学習させ、専門用語の認識を改善する。" },
    { t:"各略語の発音データエントリを Universal Phone Set 形式で追加する", c:false, e:"本来これは非標準発音の略語に有用だが、本問は全体の用語改善における最もコスト効率の良い単一アプローチを問うており、この手法が第一選択ではない。" },
    { t:"金融文書から 50,000 文の対訳コーパスを使ってベースモデルを再学習する", c:false, e:"本来これはCustom Speechのカスタマイズ ワークフローと整合しない大規模な学習作業。" }
  ],
  summary:"専門略語の認識改善を最少コストで＝ドメイン固有用語を含むプレーンテキストでの言語モデル適応。音響モデル適応/発音データ/全体再学習はいずれもコストや目的が本要件に合わない。",
  keywords:[
    { k:"Custom Speech の学習データ手法（プレーンテキスト適応/音響適応/発音データ）", d:"プレーンテキスト適応の位置づけ。" }
  ]
},
{
  id:"q243", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"ある開発者が LUIS アプリケーションを Azure AI Language の後継サービスに移行しています。新サービスでは、開発者が定義した値リストと完全一致する値を抽出する実体型は何と呼ばれますか？",
  choices:[
    { t:"学習型実体 (Learned entities)", c:false, e:"本来これは文脈からニューラルモデルが抽出するものであり、事前定義された値リストは不要。" },
    { t:"事前構築済み実体 (Prebuilt entities)", c:false, e:"本来これはDateTimeやNumberなどの一般的な型に対する標準認識器を使うものであり、開発者定義のカスタムリストは扱わない。" },
    { t:"リスト実体 (List entities)", c:true, e:"正解。CLUではlist entitiesが開発者定義の値リストから完全一致のルックアップを行う。" },
    { t:"正規表現実体 (Regex entities)", c:false, e:"本来これは値リストではなくパターンベースの正規表現を使う。" }
  ],
  summary:"開発者定義の値リストと完全一致＝リスト実体(List entities)。学習型/事前構築済み/正規表現実体はいずれも異なる抽出方式。",
  keywords:[
    { k:"CLU のエンティティ種別（学習型/事前構築済み/リスト/正規表現）", d:"List entitiesの完全一致ルックアップ。" }
  ]
},
{
  id:"q244", domain:"nlp", type:"multi", source:"Udemy AI-103",
  q:"ある開発者が Azure AI Language の Analyze Text エンドポイントを使って顧客フィードバックを処理しています。この機能に関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"3 つのタスク (sentiment、NER、key phrase extraction) を1つのマルチタスクバッチリクエストで送信できる", c:true, e:"正解。統一されたAnalyze Textエンドポイントはマルチタスクバッチリクエストをサポートし、センチメント分析、NER、キーフレーズ抽出などのタスクを1つのコールで実行できる。" },
    { t:"各リクエストには最大25文書、各5,120文字までを含められる", c:false, e:"本来これは無関係な2つの上限を混同したもので、そのような制限設定は存在しない。25文書という値は非同期処理時の集約上限であり、センチメント分析やキーフレーズ抽出のリクエストあたり文書数は10、NERは5が上限。5,120文字は同期リクエストにおける1文書あたりの上限であって、非同期では最大125,000文字まで扱える。" },
    { t:"バッチリクエストは1コールあたり1種類のタスクに制限されている", c:false, e:"本来統一エンドポイントの目的は1コールで複数タスクをサポートすることであり、この制限は事実に反する。" },
    { t:"文書は送信前に文単位に分割する必要がある", c:false, e:"本来文分割は内部で処理されるため、送信前の事前分割は不要。" },
    { t:"レスポンスには文書レベルのスコアに加えて文単位のセンチメントスコアが含まれる", c:true, e:"正解。センチメント分析は文書全体に対するセンチメントラベルと信頼度スコアを返すだけでなく、文書内の各文に対してもセンチメントラベルとスコアを返す。" }
  ],
  summary:"Analyze Textエンドポイント＝マルチタスクバッチ対応+文書/文の両レベルでセンチメントを返す。1タスク限定/事前文分割必須/25文書×5,120文字の組み合わせ制限はいずれも誤り。",
  keywords:[
    { k:"Analyze Text 統合エンドポイントの制限とマルチタスク バッチ", d:"マルチタスクバッチと文レベルセンチメント。" }
  ]
},
{
  id:"q245", domain:"nlp", type:"single", source:"Udemy AI-103",
  q:"あるボット開発者が、予約・注文ステータス・FAQ クエリを1つのエンドポイントで処理するカスタマーサービスアプリケーションを構築しています。意図認識には CLU を、FAQ 応答には Custom Question Answering を使います。どの Azure AI Language 機能が発話を正しいモデルに自動ルーティングしますか？",
  choices:[
    { t:"認識されない意図に対して CQA にフォールバックするよう構成したマルチ意図 CLU モデルを単独で配置し、閾値以下の発話だけを QA へ転送する", c:false, e:"本来これは部分的に機能するパターンだが、開発者が手動でフォールバックロジックを実装する必要があり、目的別ソリューションではない。" },
    { t:"単一エンドポイントから CLU と CQA プロジェクトへルーティングする Orchestration Workflow", c:true, e:"正解。Azure AI LanguageのOrchestration Workflowは、単一エンドポイントからCLU意図、CQAプロジェクト、外部サービスへのルーティングを可能にし、カスタムルーティングコードなしでマルチ機能ボットアーキテクチャを簡素化する。" },
    { t:"CLU と CQA を毎回両方並列で呼び出し、返ってきた信頼度スコアを比較して高い方の結果を選択するカスタム Python ルーターを自前で実装する", c:false, e:"本来これは技術的には可能なカスタム実装だが、サービスネイティブな推奨アプローチではない。" },
    { t:"Azure Bot Service に標準搭載されている言語モデルルーティング ミドルウェアを有効化し、発話を自動的に各モデルへ振り分けさせる", c:false, e:"本来これは特定のAzure Bot Service機能ではなく、ルーティングは言語サービス層で処理される。" }
  ],
  summary:"CLUとCQAへの自動ルーティング＝単一エンドポイントのOrchestration Workflow。手動フォールバックCLU/自前Pythonルーター/Bot Serviceミドルウェアはいずれもネイティブな解決策ではない。",
  keywords:[
    { k:"CLU と パターン マッチング、List エンティティ（strict/fuzzy）、オーケストレーション", d:"Orchestration Workflowによるルーティング。" }
  ]
},
{
  id:"q246", domain:"nlp", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある開発者が Azure TTS を使い、合成音声で2文の間に2秒間のポーズを挿入する必要があります。どの SSML 要素でこれを実現できますか？",
  choices:[
    { t:"<prosody rate='slow'>", c:false, e:"本来これはテキスト範囲全体で発話速度を遅くするものであり、明確なポーズを挿入するわけではない。" },
    { t:"<break time='2s'/>", c:true, e:"正解。time属性付きのSSML break要素は指定された長さのポーズを挿入し、発話セグメント間にポーズを追加する標準的な方法。" },
    { t:"<say-as interpret-as='pause' duration='2s'/>", c:false, e:"本来これは有効なSSML say-asの使い方ではない。say-asは発音の解釈制御用。" },
    { t:"<voice name='pause' duration='2s'/>", c:false, e:"本来これは有効なSSML要素の構文ではない。" }
  ],
  summary:"2文間に2秒のポーズを挿入＝<break time='2s'/>。prosody/say-as/voiceの誤用ではポーズを実現できない。",
  keywords:[
    { k:"SSML と カスタム ボイス / カスタム スピーチ", d:"<break>要素によるポーズ挿入。" }
  ]
},
{
  id:"q247", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Azure AI Document Intelligence REST API に文書を送信し、分析結果を取得する必要があります。次の手順の正しい順序はどれですか。",
  choices:[
    { t:"/documentintelligence/documentModels/{modelId}:analyze に文書付きで POST → レスポンスから operation-location ヘッダーを読み取る → operation-location URL を 'succeeded' までポーリング → AnalyzeResult JSON をパースしてページ・テーブル・フィールドを抽出", c:true, e:"正解。POSTで分析を開始し、レスポンスのoperation-locationヘッダーでポーリング先URLを得て、'succeeded'になるまでポーリングし、その後にAnalyzeResult JSONをパースする。" },
    { t:":analyze エンドポイントに文書付きで POST → 返却前提のステータス URL を 'succeeded' になるまでポーリング → その後レスポンスから operation-location ヘッダーを読み取って実行 ID を確認 → 最終的に AnalyzeResult JSON をパースしてページ・テーブル・フィールドを抽出する", c:false, e:"本来ポーリングするURLはPOSTレスポンスのoperation-locationヘッダーから先に読み取る必要があり、この順序は成立しない。" },
    { t:"まず operation-location ヘッダーを読み取って非同期処理用の URL を事前に確保 → 次に /documentModels/{modelId}:analyze エンドポイントに文書付きで POST して解析を開始 → そのまま 'succeeded' までステータスをポーリング → AnalyzeResult JSON をパースしてページ・テーブル・フィールドを抽出する", c:false, e:"本来POSTを送信するまで読み取れるoperation-locationヘッダーは存在しない。" },
    { t:"/documentModels/{modelId}:analyze エンドポイントに文書付きで POST → レスポンスから operation-location ヘッダーを読み取る → 結果が確定済みとみなして AnalyzeResult JSON を先にパース → その後 operation-location URL を 'succeeded' になるまでポーリングして完了を待つ", c:false, e:"本来操作が成功するまでポーリングで確認する前に結果をパースすることはできない。" }
  ],
  summary:"正しい順序＝:analyzeへPOST→operation-locationヘッダー読み取り→'succeeded'までポーリング→AnalyzeResult JSONをパース。順序を入れ替えた選択肢はいずれも成立しない。",
  keywords:[
    { k:"非同期 REST API のポーリング パターン（operation-location ヘッダー）", d:"Document Intelligence REST APIの正しい手順。" }
  ]
},
{
  id:"q248", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Azure Document Intelligence を使い、混合 PDF からテキスト・テーブル・見出し構造を抽出してカスタムモデルのトレーニングデータとして使いたいと考えています。どの事前構築済みモデルがその基盤を提供しますか？",
  choices:[
    { t:"Read モデル", c:false, e:"本来これはテキストと言語検出を抽出するが、テーブル構造や見出し検出は返さない。" },
    { t:"Invoice モデル", c:false, e:"本来これは請求書固有のフィールドを抽出するものであり、汎用文書構造モデルではない。" },
    { t:"Layout モデル", c:true, e:"正解。Layoutモデルはテキスト、テーブル、選択マーク、段落構造、見出し検出を返し、カスタムモデル学習の基盤として明示的に文書化されている。" },
    { t:"Business Card モデル", c:false, e:"本来これは名刺の連絡先フィールドを抽出するものであり、汎用文書構造ではない。" }
  ],
  summary:"混合PDFからテキスト/テーブル/見出し構造を抽出＝Layoutモデル。Read/Invoice/Business Cardはいずれも汎用文書構造抽出ではない。",
  keywords:[
    { k:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", d:"Layoutモデルの構造抽出範囲。" }
  ]
},
{
  id:"q249", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある企業が10社の異なるベンダーの請求書を処理しており、各社が独自のレイアウトを持っているため、それぞれに専用のカスタム Document Intelligence モデルが必要です。すべての請求書種別に対して1つのモデル ID を公開したいと考えています。どの機能でこれを実現できますか？",
  choices:[
    { t:"マルチレイアウトのトレーニングデータセットを使ったカスタムテンプレートモデル", c:false, e:"本来カスタムテンプレートモデルは単一のエンドポイントから複数の異なるレイアウトを分類することはできない。" },
    { t:"複数のカスタムモデルを1つのモデル ID に結合する composed models", c:true, e:"正解。composed modelsは複数のカスタムモデルを1つのモデルIDに結合する。文書を解析する際、どのサブモデルが入力に最も合致するかを自動的に分類して適用するため、1つのAPIエンドポイントで複数ベンダーのレイアウトを処理できる。" },
    { t:"カスタム抽出スキーマ付きの Layout モデル", c:false, e:"本来Layoutモデルは構造を提供するが、フィールド抽出やベンダー自動分類は行わない。" },
    { t:"カスタムフィールドオーバーライド構成付きの Invoice 事前構築済みモデル", c:false, e:"本来事前構築済みモデルはベンダー単位のカスタムフィールドオーバーライドをサポートしない。" }
  ],
  summary:"10社の異なるレイアウトを1モデルIDで公開＝composed models(自動分類して適切なサブモデルを適用)。カスタムテンプレート単体/Layout/Invoiceオーバーライドはいずれも不十分。",
  keywords:[
    { k:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", d:"composed modelsの自動分類。" }
  ]
},
{
  id:"q250", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"あるコンプライアンスチームが、30分間の会議録画を分析し、各シーンのトピック、話者数、30秒セグメントごとの文字起こし要約をカスタムモデル学習なしで抽出する必要があります。どの Azure AI サービスとアプローチが最適ですか？",
  choices:[
    { t:"セグメント単位のカスタムインサイト構成を使った Azure Video Indexer", c:false, e:"本来Video Indexerは豊富なインサイトを提供するが、スキーマは固定で、モデル学習なしにセグメント単位の任意のカスタム抽出スキーマはサポートしない。" },
    { t:"カスタム抽出スキーマと video analyzer を使った Azure AI Content Understanding", c:true, e:"正解。Azure AI Content Understandingは柔軟でスキーマ駆動の動画情報抽出向けに設計されており、トランスクリプト・視覚分析・音声を統合しつつ、開発者定義のJSON Schemaに合わせてセグメント単位の出力を返すため、モデル学習なしに3つの抽出要件をすべて満たす。" },
    { t:"Azure Speech のバッチ文字起こしの後にトランスクリプトチャンクを GPT-4o で要約", c:false, e:"本来これは文字起こしと要約には対応するが、セグメントごとの視覚物体抽出を統合的には行わない。" },
    { t:"サンプリングされた動画フレームに適用する Image Analysis 4.0 の dense captions", c:false, e:"本来これは音声統合やスキーマ駆動出力なしに個別フレームを分析するだけ。" }
  ],
  summary:"任意スキーマでのセグメント単位動画分析＝Content Understandingのvideo analyzer(JSON Schema駆動)。Video Indexer(固定スキーマ)/バッチ文字起こし+要約/dense captionsはいずれも要件を満たさない。",
  keywords:[
    { k:"Content Understanding と Document Intelligence / Vision の違い", d:"video analyzerのスキーマ駆動出力。" }
  ]
},
{
  id:"q251", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"あるアーキテクトが1536次元埋め込みを持つ Azure AI Search のベクトルインデックスを構成しています。彼らはベクトル次元を int8 値に圧縮してメモリ使用量を削減しつつ、精度損失を最小化したいと考えています。どのアプローチを使うべきですか？",
  choices:[
    { t:"オーバーサンプリング付きのバイナリ量子化", c:false, e:"本来バイナリ量子化は各次元を1ビットに割り当てて32倍の圧縮を行うものであり、int8への4倍圧縮より積極的な圧縮であるため、本問が求めるint8値への圧縮には合致しない。" },
    { t:"オーバーサンプリング付きのスカラー量子化", c:true, e:"正解。スカラー量子化は各float32次元をint8値にマップし、本問で言うint8形式への4倍圧縮を提供し、オーバーサンプリングが小さな精度損失を補償する。" },
    { t:"HNSW パラメータの削減 (m と efSearch を低くする)", c:false, e:"本来これはパラメータ変更でHNSWの精度を下げるものであり、ベクトルストレージをint8に圧縮するわけではない。" },
    { t:"ベクトルフィールドに stored: false を設定する", c:false, e:"本来これはベクトルを格納しないことでストレージを削減するが、ベクトル値の取得を不可能にするだけで圧縮ではない。" }
  ],
  summary:"1536次元埋め込みをint8に圧縮しつつ精度損失を最小化＝オーバーサンプリング付きスカラー量子化。バイナリ量子化(32倍)/HNSWパラメータ削減/stored:falseはいずれも本要件に合わない。",
  keywords:[
    { k:"ベクトル量子化（スカラー=int8 と バイナリ）とストレージ最適化", d:"スカラー量子化とオーバーサンプリング。" }
  ]
},
{
  id:"q252", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある開発者が、クエリ時にアプリケーションで個別の埋め込み API コールを行わずに、インデックス時にテキストチャンクを Azure AI Search が自動的に埋め込むようにしたいと考えています。インデックス時とクエリ時の両方でこのエンドツーエンドの自動ベクトル化を可能にする機能はどれですか？",
  choices:[
    { t:"Azure OpenAI 埋め込みエンドポイントを呼び出すスキルセット内のカスタムスキル", c:false, e:"本来これはカスタムスキルの記述が必要で、アプリケーションがなお埋め込みを供給しなければならない手動アプローチ。" },
    { t:"Azure OpenAI 埋め込みデプロイを指す vectorizer 構成を伴う統合ベクトル化", c:true, e:"正解。統合ベクトル化はスキルセットとvectorizer構成をインデクサーに付与することで埋め込みステップを自動化する。インデックス時にテキストチャンクが自動的に埋め込まれ、クエリ時も同じvectorizerで自動的に埋め込まれるため、別途埋め込みAPIコールが不要になる。" },
    { t:"チャンク化スキルとアプリケーションからの手動ベクトル書き込みを伴う index projections", c:false, e:"本来index projectionsはチャンク化と親子関係を扱うが、別途埋め込みコールの必要性をなくすわけではない。" },
    { t:"自動埋め込みモードに設定された HNSW efConstruction パラメータ", c:false, e:"本来これはグラフ構築の精度に関するHNSWインデックス構築パラメータであり、埋め込みの自動化ではない。" }
  ],
  summary:"インデックス時・クエリ時の両方で自動埋め込み＝vectorizer構成を伴う統合ベクトル化。カスタムスキル/index projections/HNSW efConstructionはいずれも埋め込み自体を自動化しない。",
  keywords:[
    { k:"ベクター検索 と 統合ベクトル化、フィールド属性", d:"vectorizer構成による自動ベクトル化。" }
  ]
},
{
  id:"q253", domain:"knowledge", type:"multi", source:"Udemy AI-103",
  q:"Azure AI Document Intelligence のプリビルトモデルについて、モデルとその主要な抽出対象の対応として正しい記述をすべて選びなさい。",
  choices:[
    { t:"Read モデル → テーブルや構造分析を行わず、テキスト抽出と言語検出のみを提供する", c:true, e:"正解。Readモデル: テーブルや構造分析を行わず、テキスト抽出と言語検出のみを提供する。" },
    { t:"Layout モデル → テーブル、選択マーク、見出し構造、段落レイアウトを抽出する", c:true, e:"正解。Layoutモデル: テーブル、選択マーク、見出し構造、段落レイアウトを抽出する。" },
    { t:"Invoice モデル → パスポートや運転免許証から名前、住所、生年月日、文書番号を抽出する", c:false, e:"本来この説明はInvoiceモデルではなくID Documentモデルに対応する。Invoiceモデルの正しい説明はベンダー名、請求書日付、明細項目、小計、合計を抽出すること。" },
    { t:"ID Document モデル → ベンダー名、請求書日付、明細項目、小計、合計を抽出する", c:false, e:"本来この説明はID DocumentモデルではなくInvoiceモデルに対応する。ID Documentモデルの正しい説明はパスポートや運転免許証から名前、住所、生年月日、文書番号を抽出すること。" },
    { t:"Invoice モデル → ベンダー名、請求書日付、明細項目、小計、合計を抽出する", c:true, e:"正解。Invoiceモデル: ベンダー名、請求書日付、明細項目、小計、合計を抽出する。" },
    { t:"Read モデル → テーブル、選択マーク、見出し構造、段落レイアウトを抽出する", c:false, e:"本来この説明はReadモデルではなくLayoutモデルに対応する。Readモデルの正しい説明はテーブルや構造分析を行わず、テキスト抽出と言語検出のみを提供すること。" }
  ],
  summary:"Document Intelligenceプリビルトモデルの対応＝Read(テキストのみ)/Layout(テーブル・構造)/Invoice(請求書フィールド)/ID Document(身分証フィールド)。役割の取り違えに注意。",
  keywords:[
    { k:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", d:"各プリビルトモデルの抽出対象対応。" }
  ]
},
{
  id:"q254", domain:"knowledge", type:"multi", source:"Udemy AI-103",
  q:"ある RAG パイプライン開発者が Azure AI Search の親子 index projections を使ってチャンク化を行っています。彼らは応答内で正確な引用を生成したいと考えています。親子関係が可能にする機能を2つ選んでください。",
  choices:[
    { t:"マッチした子チャンクと並んで、親文書のメタデータ (タイトル・URL など) を取得する", c:true, e:"正解。index projectionsの親子関係により、関連する子チャンクと並んで、タイトル・URLなどの親文書メタデータを取得でき、正確な引用に必要な情報が得られる。" },
    { t:"LLM に渡す前に、子チャンクを自動的にマージして元の完全な文書に戻す", c:false, e:"本来これは組み込みの動作ではなく、LLMに送る前のチャンクのマージはアプリケーション層の設計判断。" },
    { t:"テキストは子レベルにのみ格納しつつ、親レベルの埋め込みでベクトル検索を可能にする", c:false, e:"本来これは特定のインデックススキーマの選択を表すものであり、親子関係そのものの機能ではない。" },
    { t:"各チャンクをそのソース文書にリンクすることで、正確な引用生成をサポートする", c:true, e:"正解。親子関係は各チャンクからソース親文書への参照を維持することで、RAGアプリケーションでの正確な引用生成を特にサポートする。" },
    { t:"子ベクトルをバイナリ量子化で自動的に圧縮する", c:false, e:"本来これはindex projectionsと無関係。量子化は親子文書構造とは独立したベクトルフィールドの構成。" }
  ],
  summary:"index projectionsの親子関係＝親文書メタデータの取得＋各チャンクのソース文書へのリンクで正確な引用生成をサポート。自動マージ/特定スキーマ選択/自動量子化はいずれも親子関係自体の機能ではない。",
  keywords:[
    { k:"Index Projections（親子チャンク分割）による正確な引用生成", d:"親子関係による引用生成のサポート。" }
  ]
},
{
  id:"q255", domain:"knowledge", type:"multi", source:"Udemy AI-103",
  q:"ある開発者が Azure Vision Read API を使ってスキャン文書を処理しています。Read API の結果構造に関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"ReadResult はページのリストを含み、各ページはラインを、各ラインは単語と境界ポリゴンの座標を含む", c:true, e:"正解。ReadResultはページのリストを含み、各ページはラインを、各ラインは単語と境界ポリゴン座標を含む。ページ、ライン、単語の階層構造を理解することが重要。" },
    { t:"API バージョン 2023-02-01-preview の境界領域は、軸並行ボックスではなくポリゴン (x, y 点のリスト) として返される", c:true, e:"正解。APIバージョン2023-02-01-previewでは、境界領域は軸並行ボックスではなく、x,y点のリストからなるポリゴンとして返される。回転にも対応しやすい形式。" },
    { t:"Image Analysis 4.0 の同期 Read パスは、マルチページ PDF 文書には必須である", c:false, e:"本来Image Analysis 4.0の同期Readパスは単一画像向けであり、マルチページPDFでは非同期Readパスを使う必要がある。文書種別で経路が異なる。" },
    { t:"印刷文字認識は164言語をサポートし、手書き認識も同じ言語セットをサポートする", c:false, e:"本来印刷文字認識は多数の言語をサポートするが、手書き認識は同じ言語セットではなく、より限られた言語(英語・簡体字中国語・フランス語・ドイツ語・イタリア語・日本語・韓国語・ポルトガル語・スペイン語など約9言語)に対応する。両者の対応範囲は同一ではない。" },
    { t:"構造化されたテーブル コンテンツには Vision Read より Document Intelligence の Layout モデルが推奨される", c:false, e:"本来これはベストプラクティスとして妥当な記述だが、本設問はVision Read APIの結果構造そのものを問うており、正解としては選ばれていない。" }
  ],
  summary:"Read APIの結果構造＝ReadResultはpage>line>word+境界ポリゴンの階層、2023-02-01-preview以降は境界領域がポリゴン形式。同期パス必須/印刷と手書きの言語セット同一という記述は誤り。",
  keywords:[
    { k:"OCR（Read）と Document Intelligence の違い", d:"ReadResultの階層構造とポリゴン形式。" }
  ]
}

]);
