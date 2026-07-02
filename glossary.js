/* ===========================================================================
 *  Azure AI-103 用語集（curated glossary）
 * ---------------------------------------------------------------------------
 *  各エントリ: { term(表示名), aliases[](問題keywordと突き合わせる別名), cat, body }
 *  body は「これでもかというほど詳細」に、特に【混同しやすい類似概念との違い】を明記。
 *  クイズ後の用語解説と用語集画面の両方で使用。問題の keyword.k が term/alias に
 *  一致すると、その深い body がインラインでも表示される。
 * =========================================================================== */
window.AI103_GLOSSARY = [

/* ===== 計画・基盤 ===================================================== */
{
  term:"Microsoft Foundry リソース と プロジェクト", cat:"計画・基盤",
  aliases:["Foundry リソースとプロジェクトの階層","Foundry リソースとプロジェクト"],
  body:"【Foundry リソース】は Azure 側に作られる“親”で、コンピューティング・データ ストレージ・接続・Foundry Tools・ユーザー アクセス管理など、複数プロジェクトで共有する基盤を提供する。【プロジェクト】はその配下の“子”で、モデル デプロイ・エージェント・データ・コードといった開発資産をまとめる作業単位。\n【違い① 所属】1 つのプロジェクトは必ず 1 つの Foundry リソースに属す。逆に 1 リソースは複数プロジェクトを持て、最初に作ったものが“既定(default)プロジェクト”になる。\n【違い② 操作場所】ポータルの Operate>管理者(Admin)で、リソース レベル(共有基盤・全プロジェクト横断)とプロジェクト レベル(個別資産)が分かれて表示される。\n【違い③ エンドポイント】リソース レベルのエンドポイントは全プロジェクト共有の Foundry Tools 等にアクセス、プロジェクト エンドポイントは個々のプロジェクト資産にアクセスする。混同しやすいが『リソース＝共有インフラ／プロジェクト＝個別の開発箱』と捉える。"
},
{
  term:"3 つの接続情報（キー / プロジェクト エンドポイント / Azure OpenAI エンドポイント）", cat:"計画・基盤",
  aliases:["エンドポイント構成","プロジェクト エンドポイント vs Azure OpenAI エンドポイント","プロジェクト エンドポイント vs Azure OpenAI エンドポイント"],
  body:"Foundry プロジェクトのホームには 3 つの接続情報が並び、役割が明確に異なる。\n【キー(key)】モデルやツールへの“キー ベース認証”に使う秘密文字列。手軽だが漏えいリスクがあり、本番では Microsoft Entra ID(認証ユーザー/アプリ ID)認証が推奨。\n【プロジェクト エンドポイント】Foundry が直接提供するモデル(OpenAI モデル含む)へ OpenAI Responses API でアクセスし、さらに Foundry Agent サービスなど“Foundry 固有 API”へアクセスするための入口。エージェントや Foundry IQ を使うならこちら。\n【Azure OpenAI エンドポイント】OpenAI の API(Chat Completions API / Responses API)でモデルを呼ぶための入口。既存の OpenAI SDK/構文をそのまま流用したいときに使う。\n【混同ポイント】『OpenAI 構文でチャット→Azure OpenAI エンドポイント』『Foundry のエージェント/固有機能→プロジェクト エンドポイント』『認証の秘密→キー(本番は Entra ID)』。api-version は URL 側、prompt 等は本文、キーはヘッダー、という送り分けも頻出の引っかけ。"
},
{
  term:"kind=AIServices と CognitiveServices と 単一サービス リソース", cat:"計画・基盤",
  aliases:["kind=AIServices","単一サービス リソース vs マルチサービス リソース","CognitiveServices","kind=CognitiveServices","TextAnalytics","AIServices"],
  body:"Cognitive/AI サービスのリソースは作成時の kind で性質が決まる。\n【kind=AIServices】Microsoft Foundry の統合マルチサービス リソース。OpenAI・Vision・Language・Speech・Content Safety 等を 1 リソース/1 エンドポイント/1 キーで扱える“現在の推奨”。\n【kind=CognitiveServices】従来型マルチサービス。Vision/Language/Speech 等は束ねられるが Azure OpenAI を含まない点が最大の違い。\n【単一サービス(kind=OpenAI, Face, SpeechServices, TextAnalytics 等)】1 機能専用。無料(F0)枠を持つことが多い反面、複数サービス統合はできない。\n【混同ポイント】『OpenAI も 1 つに束ねたい→AIServices』『OpenAI 不要で従来どおり束ねる→CognitiveServices』『1 機能だけ/無料枠→単一サービス』。AIServices と CognitiveServices の差は“OpenAI 内包の有無”で覚える。"
},
{
  term:"RBAC ロール（OpenAI User / OpenAI Contributor / Cognitive Services User / Contributor）", cat:"計画・基盤",
  aliases:["管理プレーン vs データプレーン","キーレス認証","Cognitive Services OpenAI User","Cognitive Services OpenAI Contributor","Cognitive Services User"],
  body:"Azure OpenAI を Entra ID で使う際のロール選びは“何をしたいか”で決まる。\n【Cognitive Services OpenAI User】推論(chat/completions/embeddings)を呼ぶ最小権限。アプリが単に推論するだけならこれ。\n【Cognitive Services OpenAI Contributor】上記に加えてモデル デプロイ作成やファインチューニング管理まで可能な上位ロール。運用者向け。\n【Cognitive Services User】汎用 Cognitive Services 用でキー取得等はできるが、OpenAI のデータプレーンには“OpenAI 専用ロール”が必要なので推論は不可。\n【Contributor(共同作成者)】リソースの作成/削除/設定変更という“管理プレーン”のロール。データプレーン(推論呼び出し)の許可とは別軸で、付けても推論はできない。\n【混同ポイント＝管理プレーン vs データプレーン】Contributor/Owner は“リソースを管理”、OpenAI User/Contributor は“API を呼ぶ”。管理権限があってもデータ操作は自動では許可されない。最小権限＝『推論だけなら OpenAI User』。"
},
{
  term:"デプロイ形態（Standard / Global / Batch / Provisioned=PTU）と TPM", cat:"計画・基盤",
  aliases:["Global vs リージョン デプロイ","Batch デプロイ","TPM と PTU","Global Standard デプロイ","Global Batch デプロイ","Global Provisioned デプロイ","プロビジョニング済みスループット ユニット"],
  body:"Azure OpenAI の容量・課金・データ所在地はデプロイ形態で決まる。\n【Standard(リージョン)】作成リージョン内で処理＝“データ所在地が保証”される。従量課金(TPM)。\n【Global Standard/Batch/Provisioned】世界中の空き容量へ動的ルーティングし可用性/コスト/スループットで有利だが、処理リージョンが固定されず“所在地は保証されない”。\n【Batch】大量リクエストを非同期にまとめ 24 時間以内・低コストで処理。即時応答しない。\n【Provisioned(PTU)】専有容量を予約し、スループットと遅延が安定・課金も定額的。高負荷本番向け。\n【TPM(tokens per minute)】従量・共有容量のクォータ。PTU は予約容量の単位。\n【混同ポイント】『規制でリージョン固定→Standard(または“リージョン版”Provisioned)。Global 系は所在地を固定しない』『予測可能な専用容量→PTU、可変・小規模→Standard(TPM)、大量非同期→Batch』。"
},
{
  term:"コンテナー（標準 と 切断/disconnected）と コミットメント レベル", cat:"計画・基盤",
  aliases:["コンテナーの種類","コンテナー起動の必須環境変数","disconnected containers","切断モード","ApiKey","Eula=accept"],
  body:"AI サービスはオンプレのコンテナーとしても動かせるが 2 種類ある。\n【標準(接続)コンテナー】従量課金で動くが、定期的に Azure の課金エンドポイントへ使用量メータリングを送る必要があり、完全オフラインでは停止する。\n【切断(disconnected)コンテナー】事前購入した“コミットメント レベル(前払いの使用量階層)”の範囲で、インターネット非接続でも動作できる。利用には申請と承認が要る。\n【共通の必須環境変数】どちらも起動に ApiKey(キー)・Billing(エンドポイント)・Eula=accept の 3 つが必須。\n【混同ポイント】『完全オフライン継続運用→切断コンテナー＋コミットメント レベル購入が必須』。標準コンテナーはオフラインでは使えない点、ホスティング先(ACI か否か)は本質ではない点が引っかけ。"
},
{
  term:"ネットワーク アクセス（すべて / 選択されたネットワーク / 無効＋Private Endpoint）", cat:"計画・基盤",
  aliases:["ネットワーク アクセス 3 択","プライベート エンドポイント","選択されたネットワーク","Private Endpoint"],
  body:"リソースの到達制御は 3 択。\n【すべてのネットワーク】既定・無制限。インターネットを含む任意の発信元を許可。\n【選択されたネットワーク】許可リスト方式。指定 VNet/サブネット/公開 IP からのみ許可。『VNet 内アプリ＋特定オンプレ IP』のように公開経路も一部残したいときに使う。\n【無効＋プライベート エンドポイント】パブリック アクセスを断ち、VNet 内のプライベート IP からのみ到達＝インターネット非公開。最も厳格。\n【混同ポイント】『VNet と特定 IP の両方を許可→選択されたネットワーク』『VNet 内だけでよく完全非公開→無効＋Private Endpoint』。Key Vault へのキー保管は“認証情報の守り方”でありネットワーク到達制御ではない。"
},
{
  term:"診断ログの送信先（Log Analytics / Storage / Event Hub）と メトリック vs ログ", cat:"計画・基盤",
  aliases:["診断設定の 3 つの送信先","メトリック vs ログ","Log Analytics","Event Hub","KQL"],
  body:"診断設定でログを 3 つの先へ送れる。\n【Log Analytics ワークスペース】KQL(Kusto)でクエリ・分析でき保持期間も設定可。傾向分析の定番。\n【ストレージ アカウント】安価な長期アーカイブ向け(クエリ性は低い)。\n【Event Hub】SIEM 等へリアルタイムに外部ストリーミングする用途。\n【メトリック vs ログ】数値メトリック(呼び出し数/遅延/エラー率)は Azure Monitor メトリックで即時可視化、詳細イベントは診断ログとして上記へ。\n【混同ポイント】『KQL で分析→Log Analytics』『安く貯める→Storage』『外部にストリーム→Event Hub』。Key Vault/Redis/Container Registry は保管やキャッシュ用でログ分析先ではない。"
},

/* ===== 責任ある AI =================================================== */
{
  term:"責任ある AI の 6 原則（公平性/信頼性と安全性/プライバシーとセキュリティ/包括性/透明性/説明責任）", cat:"責任ある AI",
  aliases:["Responsible AI 6 原則","公平性（Fairness）","信頼性と安全性（Reliability & Safety）","プライバシーとセキュリティ（Privacy & Security）","包括性（Inclusiveness）","透明性（Transparency）","説明責任（Accountability）"],
  body:"Microsoft の Responsible AI は 6 原則。混同しやすいので“何を守るか”で区別する。\n【公平性(Fairness)】全員を公平に扱い、性別/民族などのバイアスを排除(例: ローン承認モデルが特定集団に不利にならない)。\n【信頼性と安全性(Reliability & Safety)】想定条件下で確実・安全に動く。厳格なテストと、確率的予測の信頼度しきい値の適切な適用(例: 自動運転/診断支援)。\n【プライバシーとセキュリティ(Privacy & Security)】学習/推論で扱う個人データを保護し安全に保つ。\n【包括性(Inclusiveness)】能力/性別/民族等に関わらず“全員に力を与える”。多様なユーザーを設計/テストに参加させる。\n【透明性(Transparency)】目的・仕組み・限界・信頼度スコアをユーザーが理解できるようにする。\n【説明責任(Accountability)】人間が最終責任を負い、ガバナンス フレームワーク内で開発する。\n【混同ポイント】公平性=“不当なバイアスがない”／包括性=“誰も排除せず力を与える”は別物。透明性=“理解できる/限界や信頼度を開示”／プライバシー=“データを守る”も別。『持続可能性(Sustainability)』『説明可能性(Explainability=透明性に内包)』は独立原則ではない。"
},
{
  term:"Content Safety の危害カテゴリ と 別機能（Prompt Shields / グラウンド検出 / 保護素材検出）", cat:"責任ある AI",
  aliases:["重大度レベル","Prompt Shields","グラウンド検出（Groundedness detection）","コンテンツ フィルター","ブロックリスト","Hate","Sexual","Violence","Self-Harm"],
  body:"Azure AI Content Safety は“カテゴリ分類”と“別機能”を分けて理解する。\n【危害カテゴリ(4種)】Hate(憎悪と公平性)/Sexual(性的)/Violence(暴力)/Self-Harm(自傷)。各カテゴリに重大度が付く。テキストは 0〜7(フル)または 0/2/4/6(簡略4段階)、画像は 0/2/4/6。0 が無害。\n【Prompt Shields】ユーザー プロンプトへの直接攻撃(ジェイルブレイク)と、取り込み文書に埋め込まれた間接攻撃(indirect/cross-domain injection)を検出。\n【グラウンド検出(Groundedness detection)】出力が提供ソースに裏付けられているか(幻覚でないか)を検出。RAG の信頼性向上に使う。\n【保護対象素材検出】既知の著作物等の一致を検出。\n【コンテンツ フィルター vs ブロックリスト】フィルターは 4 カテゴリ×しきい値で自動評価(注釈のみ/ブロックを選択、ストリーミング用の非同期版あり)、ブロックリストは組織固有の禁止語をカスタム定義して補完。\n【混同ポイント】『Hate/Sexual/Violence/Self-Harm＝カテゴリ』であって、Prompt Shields や Groundedness は“カテゴリ”ではなく別機能。"
},

/* ===== 生成 AI ======================================================= */
{
  term:"temperature と top_p", cat:"生成AI",
  aliases:["temperature と top_p","top_p","temperature"],
  body:"どちらも出力のランダム性(多様性)を制御するが仕組みが違う。\n【temperature】確率分布の“鋭さ”を変える。0 付近＝常に最尤トークン＝決定論的で安定、上げるほど多様/創造的。\n【top_p(核サンプリング)】累積確率 p までの候補だけからサンプリングし、裾の低確率語を切る。\n【違い/使い分け】temperature は分布全体を平滑化/鋭利化、top_p は候補集合を絞る。両方を同時に下げると効果が二重になり予測しづらいので、通常は“どちらか一方”を調整する。決定論的にしたいなら temperature を 0 に近づけるのが定石。\n【混同ポイント】presence/frequency penalty は“繰り返し/話題”の制御であって多様性の核ではない。max_tokens は長さの上限で確度とは無関係。"
},
{
  term:"presence_penalty と frequency_penalty", cat:"生成AI",
  aliases:["presence_penalty vs frequency_penalty","presence_penalty","frequency_penalty"],
  body:"どちらも繰り返しを抑える方向のペナルティだが基準が違う。\n【presence_penalty】“一度でも登場したか(存在)”で一律にペナルティ。新しい話題への転換を促す。\n【frequency_penalty】“登場した回数(頻度)”に比例してペナルティ。同じ語の反復を抑える。\n【違い】presence=話題の多様化、frequency=語彙反復の低減。目的が異なるため、単調さ対策なら frequency、話題を広げたいなら presence。\n【混同ポイント】これらは決定論性(確度)や JSON 構造の制御とは無関係。"
},
{
  term:"RAG と ファインチューニング と プロンプト エンジニアリング", cat:"生成AI",
  aliases:["ファインチューニング vs RAG vs プロンプト","RAG（検索拡張生成）","ファインチューニング","fine-tuning","Few-shot"],
  body:"“何を変えたいか”で使い分ける 3 手法。\n【プロンプト エンジニアリング/Few-shot】指示や例で誘導。手軽・即時だが根本的な知識/挙動は変えられない。\n【RAG(検索拡張生成)】質問に関連する文書を検索で取り出しプロンプトに添えて回答させる。“最新/社内固有の知識”を再学習なしで根拠付きに反映。知識不足の解決策。\n【ファインチューニング】望ましい入出力ペアでモデルの重みを微調整し、“文体/形式/分類ラベルなど挙動そのもの”を一貫化。プロンプトや RAG で賄えない振る舞いに有効。\n【違い/選択順】まず安価なプロンプト→足りない知識は RAG→それでも揃わない挙動はファインチューニング。『知識不足=RAG／挙動の一貫化=ファインチューニング』が鉄則。RAG の取得件数を増やしても文体は変わらない。"
},
{
  term:"On Your Data の strictness と 取得ドキュメント数（top n documents）", cat:"生成AI",
  aliases:["strictness と top n documents","クエリの種類","strictness","厳密度","top n documents"],
  body:"RAG(On Your Data)の関連性は 2 つの別軸で調整する。\n【strictness(厳密度, 1〜5)】文書を“関連”と見なす分類しきい値。高いほど厳選(精度↑/再現率↓)＝無関係文書を除外、低いほど網羅(ノイズ↑)。\n【top n documents(取得ドキュメント数)】検索で LLM に渡す上位ヒット件数。増やすほど網羅性は上がるが無関係文書も混ざりやすい。\n【違い】strictness＝“通す/落とすのしきい値”、top n＝“何件渡すか”。無関係文書を除きたいなら strictness を上げる(top n を増やすのは逆効果)。\n【クエリの種類】keyword/semantic/vector/hybrid/vectorSemanticHybrid を選べる。vector/semantic 系は関連性把握に優れるが、vector には埋め込みモデルのデプロイとベクター フィールドが要る。"
},
{
  term:"JSON モード と Structured Outputs", cat:"生成AI",
  aliases:["Structured Outputs と関数呼び出し","Structured Outputs","JSON モード","response_format"],
  body:"どちらも機械可読な出力のための機能だが保証の強さが違う。\n【JSON モード(response_format=json_object)】“構文的に妥当な JSON”であることは保証するが、どのキーがあり型が何かという“特定スキーマへの準拠”までは保証しない。\n【Structured Outputs(JSON スキーマ指定)】与えた JSON スキーマ(必須プロパティ/型)に出力が厳密準拠することを保証。最も強い保証。\n【関数呼び出し(tools)】引数を構造化 JSON で受け取れ、strict 指定でスキーマ厳守を強められる。\n【違い/選択】『妥当な JSON でよい→JSON モード』『独自スキーマに厳密準拠が必須→Structured Outputs』。stop は生成停止、logit_bias はトークン傾向で、いずれもスキーマ保証ではない。"
},
{
  term:"モデルのライフサイクル（公開/既定/廃止=retirement）", cat:"生成AI",
  aliases:["モデルのライフサイクル"],
  body:"各モデル バージョンには公開→既定化→廃止(retirement)のスケジュールがある。\n【デプロイの更新方針】『自動更新(既定に追随)』『新版公開時にアップグレード』『固定(手動)』を選べる。\n【重要な例外】自動更新を無効(固定)にしていても、選択中バージョンが“廃止日”に達すると、サービス継続のため既定(後継)バージョンへ強制アップグレードされる。\n【混同ポイント】アップグレードのトリガーは“廃止日”であり、『5 世代古い』等の世代カウントや『自動で有効化される』仕様は存在しない。ゆえに廃止スケジュールの監視が必要。"
},
{
  term:"DALL-E 3 のリクエスト（ヘッダー/URL/本文の送り分け）", cat:"生成AI",
  aliases:["DALL-E 3 の body パラメーター"],
  body:"画像生成 REST 呼び出しは項目を送る“場所”が問われる。\n【ヘッダー】api-key(認証)・Content-Type(application/json)。\n【URL/接続側】リソース エンドポイント＋デプロイ名＋api-version。\n【本文(body)】prompt(生成内容)・size(1024x1024/1792x1024/1024x1792)・quality(standard/hd)・style(vivid/natural)・n。\n【DALL-E 3 の制約】n=1 のみ(複数枚同時生成不可)。\n【混同ポイント】api-version やキーを“本文”と勘違いさせる引っかけが多い。prompt/size/quality/style/n＝本文、api-key/Content-Type＝ヘッダー、api-version＝URL、と覚える。"
},

/* ===== エージェント ================================================== */
{
  term:"エージェントの構成（モデル＋命令＋ツール）と Foundry Agent サービス", cat:"エージェント",
  aliases:["instructions（システム指示）","Agent Service のツール","スレッド/実行/メッセージ"],
  body:"【エージェント＝LLM＋instructions(命令)＋tools(ツール)】をカプセル化した名前付き構成で、Microsoft Foundry Agent サービスをプロジェクト エンドポイント経由で使って開発/実行する。\n【作成の必須 3 要素】name・model deployment・instructions。tools は“外部機能が要るときだけ”の任意、YAML は単なる記述形式。\n【instructions】役割/口調/禁止事項/根拠の示し方を規定する中核。RAG のグラウンディング指示もここ。\n【スレッド/実行/メッセージ】thread が会話履歴(状態)を自動保持、run がツール呼び出しを含む推論を実行、message が入出力。ゆえに会話状態を Blob 等に自作保存する必要はない。\n【混同ポイント】ツールと YAML は“必須ではない”。状態保持もサービスが肩代わり。"
},
{
  term:"組み込みツール と function calling と MCP", cat:"エージェント",
  aliases:["Agent Service のツール","function calling","code interpreter","Bing grounding","MCP（モデル コンテキスト プロトコル）"],
  body:"エージェントに能力を与える手段は 3 系統。\n【組み込み(built-in)ツール】Web 検索・コード インタープリターなど Foundry 標準搭載。\n【function calling(カスタム関数)】独自関数をツール登録し、モデルが必要時に呼び出して外部処理(会議設定/通知送信など)を動的実行。\n【MCP(モデル コンテキスト プロトコル)】カスタム/サードパーティ ツールや(Foundry IQ 経由の)ナレッジをエージェントへ接続する標準プロトコル。\n【違い】『Foundry 既製→組み込み』『自作の外部処理→function calling』『外部サービス/ナレッジ接続の共通土台→MCP』。静的テンプレートや素のモデルでは外部アクションは実行できない。"
},
{
  term:"Foundry IQ", cat:"エージェント",
  aliases:["Foundry IQ"],
  body:"【Foundry IQ】は複数のナレッジ ソースとの統合を簡略化するため、プロジェクトに“1 つの中央 MCP ベースのナレッジ接続”を作れる機能。エージェントはツール経由でここに到達し、含まれるデータでプロンプトをグラウンド(コンテキスト化)する。\n【混同ポイント】Azure AI Search はナレッジ ソースの“1 つ”になり得るが、複数ソースを 1 接続に束ねる“集約層”は Foundry IQ の役割。ナレッジ ストアのテーブル投影や Blob は個々の保存先であって集約層ではない。"
},
{
  term:"オーケストレーション フレームワーク（Semantic Kernel / Agent Framework）と Bot Framework / AML の違い", cat:"エージェント",
  aliases:["Microsoft Agent Framework / Semantic Kernel"],
  body:"【Semantic Kernel / Microsoft Agent Framework】プラグイン・プランナー・メモリでツールとモデルを編成し、マルチエージェント協調を実装できる SDK。Foundry Agent サービスと組み合わせて複雑ワークフローを作る。\n【違い】Azure Bot Framework は“1 つの会話ボット”をチャネル横断で作る枠組みで、複数エージェント編成が主目的ではない。Azure Machine Learning は ML モデルの学習/実験/デプロイ基盤でエージェント編成の道具ではない。Cognitive Services API は個別 AI 機能の呼び出しで調整機能を持たない。『マルチエージェント オーケストレーション＝Semantic Kernel/Agent Framework』。"
},

/* ===== コンピューター ビジョン ======================================= */
{
  term:"画像分類（Multiclass / Multilabel）と 物体検出", cat:"ビジョン",
  aliases:["Multiclass vs Multilabel","分類 vs 物体検出","Multilabel","Multiclass","物体検出（Object Detection）"],
  body:"Custom Vision のタスク種別。\n【画像分類】画像“全体”にラベルを付ける(位置なし)。さらに Multiclass=相互排他で 1 画像 1 タグ、Multilabel=非排他で複数タグ同時可(例: 海＋夕日)。作成時に選び後から変更不可。\n【物体検出】ラベルに加え画像内の“位置(バウンディング ボックス)＋信頼度”を返す。『どこに何が/いくつ』が要るなら物体検出。\n【違い】分類=画像→ラベル、物体検出=画像→[ラベル+座標]の複数。『複数タグ同時→Multilabel』『1 画像 1 タグ→Multiclass』『位置/計数→物体検出』。“物体分類”“画像検出”という種別は実在しない造語。"
},
{
  term:"Custom Vision の Training と Prediction リソース、Publish、Compact ドメイン", cat:"ビジョン",
  aliases:["発行（Publish）と Prediction リソース","Compact ドメインとエクスポート形式","Compact ドメイン","Prediction リソース","Training リソース","Publish"],
  body:"Custom Vision は 2 つのリソースに分離される。\n【Training リソース】データ アップロード・学習・イテレーション管理。\n【Prediction リソース】推論(予測)の呼び出しと課金。キーもエンドポイントも Training とは別。\n【Publish(発行)】学習済みイテレーションに公開名を付けて Prediction リソースへ発行して初めて予測 API から呼べる。運用アプリには Prediction のキー/エンドポイント＋発行済みイテレーション名を設定。\n【Compact ドメイン】唯一エクスポート可能なドメインで、TensorFlow/CoreML/ONNX/Docker 等へ出してエッジ/オフライン実行できる(標準/特化ドメインはエクスポート不可＝クラウド専用)。\n【混同ポイント】推論に Training キーは使えない。オフライン化には Compact が必須。"
},
{
  term:"precision / recall / mAP / IoU / 確率しきい値", cat:"ビジョン",
  aliases:["precision / recall / mAP","確率しきい値と重なりしきい値","precision","recall","mAP","IoU"],
  body:"物体検出/分類の評価指標。\n【precision(適合率)=TP/(TP+FP)】検出したものがどれだけ正しいか。\n【recall(再現率)=TP/(TP+FN)】実在するもののうちどれだけ拾えたか。\n【mAP(mean Average Precision)】precision-recall 全体を平均した総合指標。\n【確率しきい値(probability threshold)】上げると誤検出↓だが見逃し↑(precision↑/recall↓)。\n【IoU(overlap)しきい値】物体検出で“正解と見なす重なり度合い”。\n【混同ポイント】『高 precision・低 recall＝当てたものは正しいが見逃しが多い(慎重すぎ)』『低 precision・高 recall＝たくさん拾うが誤検出も多い』。しきい値で両者はトレードオフに動く。"
},
{
  term:"Face の detection モデル と recognition モデル、faceIdTimeToLive", cat:"ビジョン",
  aliases:["detection モデル vs recognition モデル","faceIdTimeToLive","detection_03","recognition_02","detection_01","detection_02"],
  body:"Azure Face は段階ごとにモデルが分かれる。\n【detection モデル(detection_01/02/03)】“顔を見つける”段階。detection_03 は小さい/横向き/ぼやけた顔に強い(ただし属性は返さない)。ぼやけ対策はここ。\n【recognition モデル(recognition_01〜04)】“同一人物かを照合する(認識)”段階の精度。\n【faceIdTimeToLive】検出で得た faceId をサーバーが保持する秒数(TTL、最大 86400)。照合(Verify/Identify)までの猶予に関わるだけで検出精度には無関係。\n【混同ポイント】ぼやけ検出の改善は recognition や TTL ではなく detection_03。"
},
{
  term:"Video Indexer と 空間分析（Spatial Analysis）", cat:"ビジョン",
  aliases:["空間分析（Spatial Analysis）","Spatial Analysis","Video Indexer","ビデオ インデックス"],
  body:"動画系で混同しやすい 2 サービス。\n【Azure AI Video Indexer】“録画済み”動画/音声から書き起こし・話者分離・顔/OCR/ブランド/トピック/感情など多面的インサイトを事後抽出。キー フレームのサムネイル取得は アップロード→ビデオ インデックス取得→各サムネイル取得(3 コール)。\n【空間分析(Spatial Analysis, Azure AI Vision)】“ライブ カメラ ストリーム”内の人の存在/移動/計数/滞留をリアルタイム検出(PersonCount/CrossingLine/Distance 等)。エッジ コンテナーで動くことが多い。\n【違い】『録画の総合インサイト→Video Indexer』『ライブの人物プレゼンス/動線→Spatial Analysis』。"
},
{
  term:"OCR（Read）と Document Intelligence の違い", cat:"ビジョン",
  aliases:["Read（OCR）API","OCR と Document Intelligence の違い","OCR"],
  body:"どちらも文字を扱うが返すものが違う。\n【Read(OCR)】画像/文書から“文字を座標付きで読む”だけ(pages>lines>words＋境界座標)。印刷/手書き両対応、大規模/複数ページは非同期(開始→結果ポーリング)。\n【Document Intelligence】読み取りに加え“この値は合計、これは日付”という構造(key-value/テーブル/フィールド)まで返す。\n【違い】OCR=文字の読み取り止まり、Document Intelligence=意味付き構造抽出。領収書/請求書の“特定フィールド”を最小開発で取るなら prebuilt(Document Intelligence)。"
},

/* ===== 自然言語処理 ================================================== */
{
  term:"Language 機能の使い分け（キー フレーズ / 要約 / NER / PII / エンティティ リンク）", cat:"自然言語",
  aliases:["言語検出（Language Detection）","キー フレーズ抽出","エンティティ リンク","PII 検出","NER"],
  body:"“何を返すか”で選ぶ。\n【キー フレーズ抽出】重要な語句(主に名詞句)の一覧を返す。\n【要約(Summarization)】Extractive=原文から重要“文”を選抜、Abstractive=新たに要約“文”を生成。返すのは文であってキー フレーズではない。\n【NER(名前付きエンティティ認識)】Person/Location/Organization/DateTime 等“型付きエンティティ”を抽出。\n【PII 検出】氏名/電話/口座番号など個人情報を検出/マスク。\n【エンティティ リンク】語句を Wikipedia 等の固有記事に結び付け曖昧性解消(NER が型抽出なのに対し、こちらは実体特定＋URL)。\n【混同ポイント】要約(文)とキー フレーズ(語句)、NER(型抽出)とエンティティ リンク(実体特定)の違いが頻出。言語検出は判別不能時に '(Unknown)'＋スコア 0 を返す(例外ではない)。"
},
{
  term:"感情分析の集約ルール と オピニオン マイニング", cat:"自然言語",
  aliases:["感情分析の階層","オピニオン マイニング","opinion mining"],
  body:"【文書レベルの集約】document と各 sentence に positive/neutral/negative の信頼度とラベルを返す。肯定＋中立のみ→positive、肯定と否定が共存→mixed、全て中立→neutral、否定が支配→negative。\n【オピニオン マイニング(アスペクトベース)】有効化すると target(対象=料理/接客 等)と assessment(評価語＋極性)の関係まで抽出し“観点別の賛否”が分かる。\n【違い】文書レベル感情分析は全体傾向のみ、オピニオン マイニングは観点ごとに分解。『料理は最高だが接客は最悪』を分けたいなら後者。"
},
{
  term:"CLU と パターン マッチング、List エンティティ（strict/fuzzy）、オーケストレーション", cat:"自然言語",
  aliases:["意図・エンティティ・発話","オーケストレーション ワークフロー","CLU","パターン マッチング","List エンティティ"],
  body:"意図/エンティティ認識の選択肢。\n【CLU(会話言語理解)】intent(意図)/entity(情報)を機械学習で抽出。多数の utterance で学習し言い回しの揺れに強い。どの意図にも合わないものは None 意図に入る。Language Studio(Web)で作成/学習/デプロイ。\n【パターン マッチング(Speech SDK)】定義済みパターンとの“厳密一致”に強く軽量/低遅延。揺れには弱い。List エンティティは語句カタログで、strict=リスト内の語のみ一致、fuzzy=任意テキストでもスロット充足。\n【オーケストレーション ワークフロー】複数の子プロジェクト(CLU/カスタム質問応答/別 CLU)へ発話をルーティングするハブ。エンティティを直接持たず、同一 Language リソースが所有するプロジェクトに“接続”する。\n【違い】『揺れ/学習が要る→CLU』『固定文言の厳密一致→パターン マッチング(List strict)』『複数プロジェクトを束ねる→オーケストレーション』。"
},
{
  term:"カスタム質問応答の機能（マルチターン/チットチャット/アクティブ ラーニング/代替フレーズ）", cat:"自然言語",
  aliases:["信頼度しきい値とアクティブ ラーニング","マルチターン","chitchat","アクティブ ラーニング","代替フレーズ"],
  body:"混同しやすい 4 機能。\n【マルチターン(フォローアップ プロンプト)】回答に選択肢を付け、選択に応じて次の QnA へ“分岐”する多段会話。段階的に聞き返すならこれ。\n【チットチャット(chitchat)】あいさつ等の雑談に定型応答を足す親しみ付け。\n【アクティブ ラーニング】利用ログから似た質問をまとめ、知識ベースへの追加候補を提案(運用改善)。\n【代替フレーズ(alternate phrasing)】同じ質問の言い換えを増やしヒット率向上(1 つの QnA への到達性)。\n【違い】『聞き返して分岐→マルチターン』『言い換え網羅→代替フレーズ』『改善提案→アクティブ ラーニング』『雑談対応→chitchat』。confidence threshold 未満は出さない/聞き返す制御も可能。"
},
{
  term:"SSML と カスタム ボイス / カスタム スピーチ", cat:"自然言語",
  aliases:["SSML 主要タグ","カスタム ボイス / カスタム スピーチ","SSML","say-as"],
  body:"【SSML(音声合成マークアップ言語)】既存ボイスの“発話を制御”する XML。<voice>話者切替、<prosody>速度/高さ/音量、<break>休止、<say-as interpret-as='ordinal|date|telephone'>読み解釈、<phoneme>発音記号、<lexicon>辞書。序数/日付の読み分けやアクセント調整はここ。\n【カスタム ニューラル ボイス】“独自話者の声そのもの”を学習して作る(TTS)。\n【カスタム スピーチ】専門用語/方言に強い“独自の音声認識(STT)”を学習。\n【違い】SSML=既存音声の読み方制御、カスタム ボイス=新しい声を作る、カスタム スピーチ=聞き取り精度を上げる。目的が三者三様。"
},
{
  term:"Speaker Recognition（Identification と Verification: text-dependent/independent）", cat:"自然言語",
  aliases:["Speaker Recognition の体系","text-dependent","text-independent","Speaker Identification","Speaker Verification"],
  body:"話者関連の機能は 2 系統。\n【Speaker Identification(識別, 1:N)】登録済み話者グループの中から“発話者が誰か”を特定。会議で発話者を当てる用途。\n【Speaker Verification(検証, 1:1)】主張した“本人かどうか”を照合。さらに text-dependent=登録/検証で同じパスフレーズが必要、text-independent=任意の発話で検証可。\n【違い】『グループから誰かを特定→Identification』『本人確認→Verification』。パスフレーズ固定なら text-dependent、自由発話なら text-independent。いずれも事前に音声プロファイルへ enrollment(登録)が必要。"
},
{
  term:"Translator の機能（テキスト/ドキュメント/音訳/辞書/カスタム）と BLEU", cat:"自然言語",
  aliases:["カスタム翻訳（Custom Translator）","Transliteration","音訳","Dictionary Lookup","Document Translation"],
  body:"Azure Translator の機能差。\n【テキスト翻訳】文字列を同期で翻訳(短文向け)。\n【ドキュメント翻訳】Blob 上の文書を非同期で一括翻訳し“レイアウト/書式を保持”。source 言語を指定すると品質が安定。\n【音訳(Transliteration)】文字体系の変換(例: 日本語→ローマ字)であって翻訳ではない。\n【辞書参照(Dictionary Lookup)】単語の代替訳語/用例を返す(語単位)。\n【カスタム翻訳(Custom Translator)】対訳文書で独自ドメイン モデルを学習・改善・発行。\n【BLEU スコア】カスタム翻訳の品質評価で 0〜100(高いほど参照訳に近い、実用域 40〜60)。素の定義は 0〜1 だが Custom Translator の表示は 0〜100。\n【違い】『書式付き文書丸ごと→ドキュメント翻訳』『短文→テキスト翻訳』『読みの表記変換→音訳』。"
},

/* ===== ナレッジ マイニング ========================================== */
{
  term:"AI Search の構成要素（データ ソース/インデックス/インデクサー/スキルセット）と カスタム スキル", cat:"ナレッジ",
  aliases:["カスタム スキルの I/O 形式","スキルセットと AI エンリッチメント","Custom Web API skill","EntityLinkingSkill"],
  body:"【構成要素】データ ソース(取り込み元)→インデクサー(取り込み実行)→スキルセット(エンリッチ)→インデックス/ナレッジ ストア(出力)。\n【組み込みスキル】OCR/キー フレーズ/言語検出/エンティティ認識/マージ等の“定型処理”。\n【カスタム Web API スキル】外部 HTTP エンドポイントを呼び“独自ロジック(独自 ML 等)”を差し込む。I/O は values 配列で、各要素に recordId と data(入出力)、エラーは errors/warnings。\n【違い】組み込み＝用途固定、カスタム Web API＝任意処理。独自 ML を挟むなら Custom Web API スキル一択。"
},
{
  term:"セマンティック ランカー と スコアリング プロファイル / シノニム / アナライザー", cat:"ナレッジ",
  aliases:["セマンティック キャプション/アンサー","セマンティック ランカー","スコアリング プロファイル"],
  body:"検索品質の“似て非なる”機能群。\n【セマンティック ランカー】上位結果を言語理解で“再ランク”し、semantic captions(関連抜粋)や semantic answers(質問への直接回答)を返す。\n【スコアリング プロファイル】フィールド重みや関数で“古典的スコア”を補正(言語理解ではない)。\n【シノニム マップ】同義語を展開して再現率を上げる。\n【アナライザー】テキストのトークン化方法(言語処理)を変える。\n【違い】『意味的再ランク＋抜粋/回答→セマンティック ランカー』『重み付け補正→スコアリング プロファイル』『同義語展開→シノニム』『分かち書き変更→アナライザー』。"
},
{
  term:"ベクター検索 と 統合ベクトル化、フィールド属性", cat:"ナレッジ",
  aliases:["ベクター検索とハイブリッド","統合ベクトル化","フィールド属性","simple vs full Lucene 構文","facetable","filterable","sortable","HNSW"],
  body:"【ベクター検索】埋め込みを格納する vector フィールド＋近似最近傍アルゴリズム(HNSW 等)を含むベクター プロファイルが“必須”。クエリはベクトル化して近傍探索。キーワード(BM25)＋ベクターの“ハイブリッド”＋セマンティック再ランクで精度が上がる。\n【統合ベクトル化】取り込み時に Text Split＋AzureOpenAIEmbedding スキルでチャンク化/埋め込みを自動生成し、クエリ時も vectorizer で自動ベクトル化(自作パイプライン不要)。\n【フィールド属性】searchable(全文)/filterable($filter)/sortable($orderby)/facetable(件数集計)/retrievable(返却)/key(主キー)。役割ごとに付与。\n【simple vs full Lucene】simple は基本演算子、full は正規表現/あいまい(~)/近接など高度。ワイルドカードは simple では接尾中心、先頭一致は full/正規表現が必要。\n【混同ポイント】ファセット件数＝facetable、絞り込み＝filterable、並べ替え＝sortable。"
},
{
  term:"ナレッジ ストアの 3 プロジェクション（object/table/file）", cat:"ナレッジ",
  aliases:["3 種のプロジェクション","ナレッジ ストア","table projection"],
  body:"【ナレッジ ストア】AI Search のエンリッチ結果を Azure Storage に保存する仕組みで、検索インデックスとは“別の出力先”。\n【object projection】JSON BLOB として保存。\n【table projection】行/列に分解しリレーショナル保存＝Power BI 等での分析に向く。\n【file projection】抽出画像などのバイナリを保存。\n【混同ポイント】“テーブル形式で分析したい”なら table projection。スコアリング プロファイルやセマンティック ランカーは検索品質の機能でありデータ保存先ではない。"
},
{
  term:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", cat:"ナレッジ",
  aliases:["prebuilt モデル","Read / Layout / 事前構築 / カスタム","template vs neural","合成（composed）モデル","prebuilt invoice モデル","prebuilt と custom の併用","General Document モデルの非推奨","Layout モデル","一般ドキュメント モデル","neural カスタム","template カスタム"],
  body:"用途の“粒度”でモデルを選ぶ。\n【Read】テキストと言語のみ(手書き対応)。\n【Layout】テキスト＋テーブル＋選択マーク＋構造(新版は key-value も)。複数ページ PDF の構造保持に最適。\n【一般ドキュメント(General Document)】汎用 key-value 抽出。ただし新バージョンで“非推奨/置換”(KVP は Layout に統合)。\n【prebuilt(請求書/領収書/ID/名刺/W-2 等)】特定種別の“意味付きフィールド”を学習済みで抽出。学習不要。\n【custom】独自帳票をラベル学習。template=同一レイアウト前提で高速・少数、neural=可変レイアウトに強く汎化。\n【composed】複数カスタム モデルを束ね、入力種別を自動判別して適切なモデルで抽出。\n【混同ポイント】『構造(表/選択マーク)保持→Layout』『定型の特定フィールド→prebuilt』『独自かつ可変レイアウト→neural custom』『多種を 1 EP→composed』。一般ドキュメントは新規採用しない。"
},
{
  term:"Content Understanding と Document Intelligence / Vision の違い", cat:"ナレッジ",
  aliases:["Azure Content Understanding"],
  body:"【Azure Content Understanding】フォーム/文書/画像/ビデオ/オーディオを横断して、定義した出力スキーマに沿う構造化情報(フィールド/分類/要約/計数)を抽出する“マルチモーダル”サービス。\n【違い】Document Intelligence は“文書(請求書/フォーム等)”特化でビデオ/オーディオは扱わない。Azure AI Vision は画像/一部ビデオの視覚解析(タグ/物体/OCR)で統合的マルチモーダル抽出ではない。\n【使い分け】『画像＋ビデオ＋オーディオ＋文書を横断し構造化(例: 棚画像から商品数)→Content Understanding』『文書のフィールド抽出→Document Intelligence』『画像の視覚解析→Vision』。"
},

/* ===== 開発ツール・SDK =============================================== */
{
  term:"開発環境（Visual Studio / VS Code / Foundry Toolkit / GitHub Copilot）", cat:"計画・基盤",
  aliases:["Visual Studio vs VS Code","開発環境の選択（Visual Studio と VS Code）","Foundry Toolkit for VS Code"],
  body:"【Visual Studio】.NET/Windows 開発に強い本格 IDE。\n【VS Code】多言語・クロスプラットフォームの軽量エディター。オープンソース/Web 開発者向け。どちらも Azure の AI 開発に適する。\n【Foundry Toolkit(VS Code 拡張)】プロジェクト リソース(モデル/エージェント/接続/ベクター ストア)の参照・管理、モデル カタログからのデプロイ、統合プレイグラウンドでのテスト、ビジュアル デザイナー＋YAML による宣言型/ホスト型エージェント構成、エージェント接続用の統合コード生成を行う。\n【GitHub / GitHub Copilot】GitHub はソース管理/DevOps の主要基盤で VS/VS Code にネイティブ統合、Copilot は AI ペア プログラマー。\n【混同ポイント】“Foundry プロジェクト資産を VS Code で扱う拡張”は Python 拡張でも Copilot でもなく Foundry Toolkit。"
},
{
  term:"SDK/API（Foundry SDK / OpenAI API / Foundry Tools SDK）と対応言語", cat:"計画・基盤",
  aliases:["Foundry で使う API/SDK","Foundry SDK と CI/CD"],
  body:"【Microsoft Foundry SDK】Foundry プロジェクトに接続し、エージェントや Foundry IQ など“Foundry 固有資産”へアクセス。DevOps パイプラインでの CI/CD 自動化(資産の作成/管理)にも使う。\n【OpenAI API/SDK】OpenAI 構文をサポートする Foundry モデルでチャット等を構築(Chat Completions/Responses)。\n【Foundry Tools SDK】Language/Speech/Translator/Doc Intelligence 等“AI サービス固有”のライブラリ。REST でも利用可。\n【対応言語】C#・Python・Node・TypeScript・Java など(Ruby は資料の主要列挙に含まれない)。\n【混同ポイント】『Foundry 固有(エージェント/IQ)→Foundry SDK』『OpenAI 構文→OpenAI SDK』『既製ツール→Foundry Tools SDK』。ポータルは視覚的操作、コードの自動化は SDK。"
},

/* ===== モデル選定・評価（モデル カタログ/ベンチマーク/デプロイ/評価） ===== */
{
  term:"モデル カタログの2大カテゴリ（Azure 直販 と パートナー/コミュニティ）", cat:"モデル選定・評価",
  aliases:["Foundry Models","Foundry Models（モデル カタログ）"],
  body:"Foundry Models カタログ(1,900超のモデル)は大きく 2 種に分かれる。\n【Azure が直接販売する Foundry モデル】Azure サブスクリプション経由で直接課金。Azure OpenAI モデルだけでなく Microsoft や他プロバイダーのモデルも含む。\n【パートナーおよびコミュニティのモデル】信頼できるパートナー/コミュニティが提供し、それぞれ独自のライセンスと価格を持つ。多くは Azure Marketplace サブスクリプションへの同意が必要。\n【違い】課金経路(Azureサブスク直接 vs マーケットプレイス経由)とライセンス主体が異なる。GPT-4o-mini 等 Azure 直販モデルはマーケットプレイス同意が“不要”、パートナー製モデルは利用条件への同意が“必要”になりやすい点が頻出の引っかけ。"
},
{
  term:"モデル カタログのフィルター属性（コレクション/機能/ソース/推論タスク/微調整方法/業界）", cat:"モデル選定・評価",
  aliases:["モデルカタログのフィルター","カタログの検索・絞り込み"],
  body:"カタログ検索を絞り込む代表的な軸。\n【コレクション】Azure 直接提供 or Hugging Face リポジトリ等の分類。\n【機能(Capability)】推論(複雑な問題解決)・ツール呼び出し(API/関数統合)・マルチモーダル処理(テキスト/画像/オーディオ)など。\n【ソース】Azure OpenAI・Microsoft・Cohere・Mistral・Meta・Anthropic 等のプロバイダー。\n【推論タスク】テキスト生成・要約・翻訳・画像生成・音声合成等の具体タスク。\n【微調整方法】サポートされる fine-tuning 手法。\n【業界】特定業界データセットで学習された特化モデル(汎用より高性能なことが多い)。\n【混同ポイント】“機能(Capability)”は技術的な力(推論/ツール呼び出し/マルチモーダル)、“推論タスク(Inference task)”は用途(要約/翻訳等)を指し、名前が似るが軸が違う。"
},
{
  term:"LLM と SLM（大規模言語モデル と 小規模言語モデル）", cat:"モデル選定・評価",
  aliases:["大規模言語モデル (LLM)","小さな言語モデル (SLB)","LLM vs SLM"],
  body:"【LLM(大規模言語モデル): GPT-5, Mistral Large, Llama 3 70B 等】深い推論・複雑なコンテンツ生成・広範なコンテキスト理解が必要なタスク向け。高度だが計算リソースを多く要する。\n【SLM(小規模言語モデル): Phi-4, Mistral OSS, Llama 3 8B 等】一般的な NLP タスクを効率・低コストで処理。最も複雑な推論より“速度とコスト”が重要な場面に最適で、下位ハードウェアやエッジ デバイスでも実行可能。\n【混同ポイント】『精度最優先・複雑推論→LLM』『速度/コスト最優先・エッジ実行→SLM』。エッジ/オフライン実行の可否という点で、Custom Vision の Compact ドメイン(画像系のエッジ最適化)と発想が似ているが対象はテキストモデル。"
},
{
  term:"チャット補完モデル と 推論モデル", cat:"モデル選定・評価",
  aliases:["推論モデル","チャット完了と推論モデル"],
  body:"【チャット補完(Chat Completion)モデル】コンテキストに応じた一貫性のあるテキスト応答を生成。会話型インターフェイスやコンテンツ生成アプリの主力で、カタログの大半を占める。\n【推論モデル: 例 Claude Opus 4.6】数学・コーディング・科学・戦略・物流など“高い問題解決能力”が要る複雑タスクに強く、複雑な問題を分解し推論過程を示せる。\n【違い】チャット補完は“対話の自然さ/一貫性”重視、推論モデルは“多段階の論理的正しさ”重視。要件が単純な会話生成ならチャット補完で十分、複雑な数理/戦略タスクは推論モデルを選ぶ。"
},
{
  term:"特化モデル（埋め込み/画像生成/動画生成/画像分析=マルチモーダル/TTS/STT）", cat:"モデル選定・評価",
  aliases:["埋め込みモデル","画像生成モデル","ビデオ生成モデル","画像分析モデル","テキスト読み上げモデル","音声テキスト変換モデル"],
  body:"タスク固有モデルの識別。\n【埋め込み(Embedding)モデル: Ada, Cohere 等】テキストを数値ベクトルに変換。セマンティック検索・レコメンド・RAG(意味に基づく検索)に使う。\n【画像生成モデル: GPT-image-1 等】テキスト説明から画像を作成(マーケティング素材/イラスト/デザイン モックアップ)。\n【動画生成モデル: Sora 2 等】テキスト説明から動画コンテンツを作成。\n【画像分析(マルチモーダル)モデル: GPT-4.1 等】テキスト＋画像の入力を受け付け、画像を分析した自然言語出力を生成。\n【テキスト読み上げ(TTS)モデル: GPT-4o-tts 等】テキストを合成音声に変換。\n【音声テキスト変換(STT)モデル: GPT-4o-transcribe 等】音声データをテキスト文字起こしに変換。\n【混同ポイント】画像“生成”(text→image)と画像“分析”(image→text, マルチモーダル)は入出力の向きが逆。TTS(text→speech)と STT(speech→text)も向きが逆。"
},
{
  term:"4つのベンチマーク軸（品質/安全性/コスト/パフォーマンス）", cat:"モデル選定・評価",
  aliases:["モデル ベンチマーク","Access モデル ベンチマーク"],
  body:"Foundry のモデル ベンチマークは 4 軸に整理される。\n【品質】正確性・一貫性・コンテキスト適合性(品質インデックス等)。\n【安全性】有害/偏った/不適切なコンテンツ生成への耐性(HarmBench/ToxiGen/WMDP 等)。\n【コスト】入力/出力トークン単価・推定コスト。\n【パフォーマンス】応答速度・効率(レイテンシ/スループット)。\n確認方法は 2 通り：モデル カタログの“モデル ランキング”(全モデル比較)と、個々のモデル カードの“ベンチマーク タブ”(詳細＋類似モデルとの比較グラフ)。\n【混同ポイント】“品質が高い=万能”ではなく、コストやレイテンシとのトレードオフで選ぶのが実務的（トレードオフ グラフ参照）。"
},
{
  term:"品質ベンチマークのデータセットと品質インデックス", cat:"モデル選定・評価",
  aliases:["品質インデックス","品質ベンチマーク","HumanEval+","MBPP+","MATH","MMLU-Pro","IFEval","Arena-Hard","BIG-Bench Hard","GPQA"],
  body:"【品質インデックス】推論・知識・質問応答・数学・コーディングを測る複数ベンチマークの精度スコアを平均した“高レベル概要”指標。0〜1 の正規化インデックスで、大きいほど汎用タスク全体の性能が高い。\n【個別データセット】Arena-Hard(敵対的質問への回答)／BIG-Bench Hard(推論能力)／GPQA(大学院レベル多分野の質問)／HumanEval+・MBPP+(コード生成)／MATH(数学的推論)／MMLU-Pro(一般知識)／IFEval(指示追従)。\n【混同ポイント】『コード生成の実力を見たい→HumanEval+/MBPP+』『数学の実力→MATH』『指示に従う力→IFEval』など、聞かれている能力とデータセット名を対応させる問題が頻出。品質インデックスは“複数データセットの平均”であり単一データセットのスコアではない。"
},
{
  term:"安全ベンチマーク（HarmBench=ASR / ToxiGen=F1 / WMDP）", cat:"モデル選定・評価",
  aliases:["有害な動作の検出","有害なコンテンツ検出","機密ドメインの知識","HarmBench","ToxiGen","WMDP"],
  body:"3 つの安全性評価軸。\n【HarmBench(有害な動作の検出)】モデルが安全でないコンテンツ生成にどれだけ抵抗するかを測定。指標は攻撃成功率(ASR, Attack Success Rate)＝“低いほど安全”。標準的な有害行動(サイバー犯罪/違法行為/一般的損害)・文脈上有害な行動(誤情報/嫌がらせ/いじめ)・著作権侵害の 3 領域をテスト。\n【ToxiGen(有害コンテンツ検出)】敵対的/暗黙的ヘイト スピーチの識別力を測定。指標は F1 スコアで“高いほど”少数派グループへの言及間で検出性能が良い。\n【WMDP(機密ドメインの知識, Weapons of Mass Destruction Proxy)】バイオ/サイバー/化学セキュリティに関する知識量を測定。スコアが高いほど“危険な知識を多く持つ”ことを示す(＝この指標は高いことが必ずしも良いわけではなく、リスク管理の文脈で見る)。\n【混同ポイント】ASR は低いほど良い、ToxiGen の F1 は高いほど良い、WMDP は高いほど“懸念すべき知識量が多い”——スコアの“良い方向”が指標ごとに異なる点が最大の引っかけ。"
},
{
  term:"コスト ベンチマーク（入力/出力トークン単価と推定コスト）", cat:"モデル選定・評価",
  aliases:["コスト ベンチマーク"],
  body:"【入力トークンあたりのコスト】100万入力トークン(モデへ送るテキスト)処理の価格。\n【出力トークンあたりのコスト】100万出力トークン(モデルが生成するテキスト)の価格。\n【推定コスト】一般的な 3:1 比率(出力1トークンに対し入力3トークン)で入力/出力コストを合成した単一の比較値。値が小さいほどコスト効率が高い。\n【混同ポイント】入力と出力でトークン単価が異なるのが通常(出力の方が高いことが多い)。“推定コスト”は実際の利用比率と一致するとは限らない一般化された比較指標である点に注意。"
},
{
  term:"パフォーマンス ベンチマーク（レイテンシ P50/P90/P95/P99・TTFT と スループット GTPS/TTPS）", cat:"モデル選定・評価",
  aliases:["レイテンシ","スループット","Time to First Token","TTFT"],
  body:"【レイテンシ(応答速度)】平均＝要求処理の平均秒数。P50(中央値)＝50%の要求がこれより速く完了。P90/P95/P99＝それぞれ90%/95%/99%の要求がこれより速く完了(パーセンタイルが上がるほど“最悪ケースに近い”遅さを示す)。TTFT(Time To First Token)＝ストリーミング時に最初のトークンが届くまでの時間。\n【スループット(処理能力)】GTPS(Generated Tokens Per Second)＝1秒あたり生成される出力トークン数。TTPS(Total Tokens Per Second)＝1秒あたり処理される入出力トークンの合計。トークン間の時間＝連続トークンの受信間隔。\n【混同ポイント】P50 と P99 は“同じレイテンシ指標”でも意味が違う(中央値 vs ほぼ最悪ケース)。対話型アプリでは低レイテンシ＋高スループットが有利、速度よりコスト重視のバッチ処理では他要因を優先してよい。"
},
{
  term:"モデル ランキング / シナリオ ランキング / トレードオフ グラフ / サイド バイ サイド比較", cat:"モデル選定・評価",
  aliases:["ランキングと比較機能"],
  body:"モデル比較の 4 つの見方。\n【モデル ランキング】品質・安全性・推定コスト・スループットで全モデルを並べ替えた比較。\n【シナリオ ランキング】推論・コーディング・数学・質問応答・根拠(グラウンディング)など“特定ユース ケース”に最適化されたモデルを探す。全体品質インデックスだけに頼らず、関連するシナリオ ランキングから始めるのが推奨。\n【トレードオフ グラフ】品質×コスト、品質×スループット等“2 メトリックを同時表示”。右上に近いモデルが両方で良好。精度は少し劣っても大幅に速い/安いモデルが実要件に合うこともある。\n【サイド バイ サイド比較】2〜3 モデルを選び、ベンチマーク・モデル詳細(コンテキスト ウィンドウ等)・サポートされるエンドポイント・機能サポート(関数呼び出し/構造化出力/ビジョン等)を横並び比較。\n【混同ポイント】『全体の順位を見る→モデル ランキング』『自分のユース ケースに近い順位→シナリオ ランキング』『2軸のバランスを視覚化→トレードオフ グラフ』『複数モデルの詳細を横並び→サイド バイ サイド』。"
},
{
  term:"Foundry の9つのデプロイの種類（Global / Data Zone / Standard × Standard/Provisioned/Batch、Developer）", cat:"モデル選定・評価",
  aliases:["デプロイの種類","デプロイ形態（Standard / Global / Batch / Provisioned=PTU）と TPM","Data Zone Standard","Data Zone Provisioned","Data Zone Batch","Regional Provisioned","Developer デプロイ"],
  body:"デプロイは“地理的範囲(Global/Data Zone/単一リージョン)”×“課金/スケール方式(Standard=トークン従量/Provisioned=PTU予約/Batch=非同期割引)”の組み合わせ＋特殊枠(Developer)で計9種。\n【Global Standard】任意のAzureリージョンをトークン単位で使用。一般ワークロードに最適で“最高のクォータ”を提供。\n【Global Provisioned】任意のリージョンで予約済みPTUベース＝予測可能な高スループット。\n【Global Batch】任意のリージョンで24時間以内の大規模非同期ジョブに“50%割引”。\n【Data Zone Standard】トークン単位でデータをEU/US等の“特定データ ゾーン内”に収める。地域コンプライアンス要件向け。\n【Data Zone Provisioned】データ ゾーン内の予約済みPTUで予測可能なスループット。\n【Data Zone Batch】データ ゾーン内の大規模非同期バッチ ジョブ向け。\n【Standard(リージョン)】単一リージョン内でトークン単位。地域データ所在地コンプライアンスや小規模用途向け。\n【Regional Provisioned】単一リージョン内の予約済みPTU。\n【Developer】任意のリージョンをトークン単位で使うが“微調整モデルの評価専用”。\n【混同ポイント】『クォータ最大＋一般用途→Global Standard』『EU/US データ所在地保証(グローバルより粒度が広い)→Data Zone Standard』『単一リージョンに厳密固定→Standard/Regional Provisioned』『微調整モデルの検証のみ→Developer』。"
},
{
  term:"手動評価（対話型テスト/構造化レビュー/ユーザー調査）", cat:"モデル選定・評価",
  aliases:["手動評価アプローチ","構造化されたレビュー"],
  body:"人間が評価する 3 手法。\n【プレイグラウンドでの対話型テスト】さまざまなプロンプトを入力し応答を定性的に観察(探索的テスト)。モデル同士を並べてテストする比較もできる。\n【構造化されたレビュー】ユース ケースを表すテスト ケース集合を作り、関連性(質問に答えているか)・情報性(十分な詳細か)・エンゲージメント(会話として興味深いか)・正確性(事実は正しいか)・安全性(有害/偏り/不適切を避けているか)を1〜5等のスケールで評価し集計。\n【ユーザー調査】実際/代表的なユーザーからのフィードバック収集。制御されたテストでは見逃しがちな“わかりにくい言い回し”等の実問題を明らかにする。\n【混同ポイント】自動メトリックでは測れない“満足度/文脈の適切さ/ブランドとの整合”を捉えるのが手動評価の強み。"
},
{
  term:"生成品質メトリクス（Groundedness / Groundedness Pro / Relevance / Coherence / Fluency / Similarity）", cat:"モデル選定・評価",
  aliases:["AI 支援の品質メトリック","Groundedness Pro","Groundedness","Relevance","Coherence","Fluency","Similarity"],
  body:"自動評価(AI支援)の生成品質軸。\n【Groundedness(根拠)】応答が“予測”ではなく“提供されたコンテキスト”に基づくかを判定＝RAGの幻覚検出に直結。\n【Groundedness Pro】事実の正確性評価に役立つ“二者択一(接地している/いない)”の評価方式を提供する強化版。\n【Relevance(関連性)】応答がユーザーの質問/要求に適切に対応しているか。\n【Coherence(一貫性)】応答が論理的に流れ、一貫したアイデアを保っているか。\n【Fluency(流暢性)】言語の正確性と自然な言語品質。\n【Similarity】正解(ground truth)との意味的一致度。\n【混同ポイント】Groundedness(コンテキストへの裏付け)と Relevance(質問への関連性)は別軸——幻覚検出は前者、的外れ回答の検出は後者。Similarity は“正解データ”との比較である点でGroundedness(“与えた文脈”との比較)と混同しやすい。Groundedness Pro は“通常の Groundedness”の強化版であり別概念ではない。"
},
{
  term:"リスクと安全性メトリクスと欠陥率（defect rate）", cat:"モデル選定・評価",
  aliases:["リスクと安全性のメトリック","欠陥率"],
  body:"【リスクと安全性メトリクスの種類】自傷行為の内容／ヘイトフルおよび不公平なコンテンツ／暴力コンテンツ／性的コンテンツ／保護された素材(著作権/独自コンテンツの複製)／間接攻撃(脱獄, jailbreak への脆弱性)。\n【欠陥率(defect rate)】コンテンツ損害メトリクスの集計方法で、重大度しきい値(通常“中”)を超える応答の割合。保護された素材・間接攻撃については (true instances / total instances) × 100 で計算。\n【AI支援評価の仕組み】評価を実行する“ジャッジ役”の GPT モデル(エバリュエーター モデル)を指定し、それが応答を分析してスコアを付与する。\n【混同ポイント】保護された素材/間接攻撃の欠陥率計算式は他のコンテンツ損害メトリクスと異なる(true/total×100)点が問われやすい。"
},
{
  term:"NLP メトリクス（F1 / BLEU / METEOR / ROUGE / GLEU）", cat:"モデル選定・評価",
  aliases:["NLP メトリクス","F1 スコア","METEOR","ROUGE","GLEU"],
  body:"“正解データ(ground truth)”との数学的比較によるメトリクス群(エバリュエーター モデル不要)。\n【F1 スコア】生成回答と正解の“共有単語の比率”。適合率(不適切語を避ける)と再現率(重要語を含む)のバランス。分類/情報取得タスク向け。\n【BLEU】生成テキストと参照テキストの n-gram(単語列)一致度。機械翻訳評価で定番。\n【METEOR】BLEU を同義語・語幹・言い換えで拡張し、より柔軟な比較を提供。\n【ROUGE】適合率より“再現率(Recall)”重視——要約タスクで“重要な論点を押さえているか”を測るのに向く(余分な語を避けるより網羅性重視)。\n【GLEU(Google-BLEU)】文レベル評価向けに設計された BLEU の一種。\n【混同ポイント】『翻訳評価の定番→BLEU』『同義語も考慮して柔軟に→METEOR』『要約で網羅性重視→ROUGE』『文単位の評価→GLEU』。いずれも“唯一の正解”がある場合に適し、多くの妥当な応答があり得るオープンエンドな生成には不向き。"
},
{
  term:"評価の対象（モデル/エージェント/データセット）とデータセットの3オプション", cat:"モデル選定・評価",
  aliases:["包括的な評価","エバリュエーター ライブラリ"],
  body:"【評価の対象】モデル(指定プロンプトでデプロイ済みモデルを評価、出力は評価中に生成)／エージェント(ユーザー定義プロンプトでエージェント応答を評価)／データセット(既に生成済みの出力を評価)。\n【データセットの3オプション】新しいデータセットのアップロード(CSV/JSONL)／既存のデータセットを使用(プロジェクトに以前アップロード済み)／合成データセットの生成(トピック説明から自動生成。生成用リソース・行数・説明プロンプトを指定、任意でファイルもアップロード可)。\n【エバリュエーター ライブラリ】Microsoft キュレーションのエバリュエーター(品質/安全性/パフォーマンス)を閲覧、詳細(名前/説明/パラメーター)確認、品質エバリュエーターの注釈プロンプトや安全エバリュエーターの重大度レベル確認、カスタム エバリュエーターの管理・バージョン管理・共同作業が可能。\n【混同ポイント】“モデル評価”は出力をその場で生成、“データセット評価”は既に出力が入ったデータを評価——入力に出力が“含まれているかどうか”が違い。"
}

];
