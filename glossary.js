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
  aliases:["重大度レベル","Prompt Shields","グラウンド検出（Groundedness detection）","コンテンツ フィルター","ブロックリスト","Hate","Sexual","Violence","Self-Harm","userPrompt","documents配列","RAGコンテンツ安全性パイプライン"],
  body:"Azure AI Content Safety は“カテゴリ分類”と“別機能”を分けて理解する。\n【危害カテゴリ(4種)】Hate(憎悪と公平性)/Sexual(性的)/Violence(暴力)/Self-Harm(自傷)。各カテゴリに重大度が付く。テキストは 0〜7(フル)または 0/2/4/6(簡略4段階)、画像は 0/2/4/6。0 が無害。\n【Prompt Shields】ユーザー プロンプトへの直接攻撃(ジェイルブレイク)と、取り込み文書に埋め込まれた間接攻撃(indirect/cross-domain injection)を検出。APIを直接呼ぶ場合、リクエスト本文の userPrompt フィールドにエンドユーザーの入力を、documents 配列に取得ドキュメントのテキストを渡すことで、1回の呼び出しで直接・間接の両インジェクションを検査できる——両者を1つの文字列に結合したり、documentsを省略してコンテキストから自動推論させたりすることはできない。\n【グラウンド検出(Groundedness detection)】出力が提供ソースに裏付けられているか(幻覚でないか)を検出。RAG の信頼性向上に使う。\n【保護対象素材検出】既知の著作物等の一致を検出。\n【コンテンツ フィルター vs ブロックリスト】フィルターは 4 カテゴリ×しきい値で自動評価(注釈のみ/ブロックを選択、ストリーミング用の非同期版あり)、ブロックリストは組織固有の禁止語をカスタム定義して補完。\n【RAGチャットボットの本番向けパイプライン順序】① ユーザークエリ受信時にユーザーメッセージへ直接プロンプトインジェクションシールドを適用 → ② 取得したチャンクをプロンプトに注入する前に間接プロンプトインジェクションシールドを適用 → ③ LLMが生成したグラウンディング済み応答をグラウンディング検出に通す → ④ 最終応答を返す前にコンテンツカテゴリフィルター(Hate/Violence/Sexual/Self-Harm)を適用。コンテンツカテゴリフィルターは“出力”に対して“最後”に適用するのが原則であり、入力に先に適用したり、間接シールドをユーザーメッセージの検査より先に行ったりする順序は誤り。\n【混同ポイント】『Hate/Sexual/Violence/Self-Harm＝カテゴリ』であって、Prompt Shields や Groundedness は“カテゴリ”ではなく別機能。『Prompt Shieldsのリクエストフィールド→userPrompt(ユーザー入力)+documents(外部コンテンツ)』『RAGパイプラインの順序→直接シールド→間接シールド→グラウンディング検出→出力カテゴリフィルター』。"
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
  term:"DALL-E 3 のリクエスト（ヘッダー/URL/本文の送り分け）と応答形式", cat:"生成AI",
  aliases:["DALL-E 3 の body パラメーター","response_format","b64_json","DALL-E の応答形式"],
  body:"画像生成 REST 呼び出しは項目を送る“場所”が問われる。\n【ヘッダー】api-key(認証)・Content-Type(application/json)。\n【URL/接続側】リソース エンドポイント＋デプロイ名＋api-version。\n【本文(body)】prompt(生成内容)・size(1024x1024/1792x1024/1024x1792)・quality(standard/hd)・style(vivid/natural)・n。\n【DALL-E 3 の制約】n=1 のみ(複数枚同時生成不可)。\n【応答形式】既定では生成画像への“URL”が返り、Azure OpenAI ではその URL は約 24 時間で失効する。恒久保存したければ期限内にダウンロードして自前ストレージへ保存する。response_format に b64_json を指定すれば、URL の代わりに Base64 エンコードされた画像データを直接受け取れる。\n【混同ポイント】api-version やキーを“本文”と勘違いさせる引っかけが多い。prompt/size/quality/style/n＝本文、api-key/Content-Type＝ヘッダー、api-version＝URL、と覚える。応答の URL は“permanent ではない”点も頻出。"
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
  aliases:["空間分析（Spatial Analysis）","Spatial Analysis","Video Indexer","ビデオ インデックス","話者ダイアライゼーション","視覚ラベル","OCRインサイト","キーフレーム抽出","ショットおよびシーン分割","ブランド言及"],
  body:"動画系で混同しやすい 2 サービス。\n【Azure AI Video Indexer】“録画済み”動画/音声から書き起こし・話者分離・顔/OCR/ブランド/トピック/感情など多面的インサイトを事後抽出。キー フレームのサムネイル取得は アップロード→ビデオ インデックス取得→各サムネイル取得(3 コール)。\n【Video Indexer の主なインサイト種別】話者ダイアライゼーション付きトランスクリプト(音声トラックに登場する異なる話者を識別しタイムスタンプを付与、顔プロファイルが登録済みなら名前でも識別可能)／視覚ラベル(動画フレーム内のシーン物体を識別、発話内容ではない)／OCR インサイト(動画フレーム上に表示されるテキストを検出、発話単語ではない)／キーフレーム抽出(サムネイル用の代表フレーム抽出、トランスクリプトではない)／ショットおよびシーン分割(シーンの変化に基づいて動画を意味のある視覚セグメントに分割する、ブランド認識ではない)／ブランド言及(動画内で話されたり表示されたりする企業名・製品名・ブランド名を認識する、シーン分割ではない)。“各話者の名前付き文字起こし”が欲しい場合は話者ダイアライゼーション＋顔認識付きトランスクリプトを使う。ショットおよびシーン分割とブランド言及は名前が紛らわしいが、前者は“視覚セグメントへの分割”、後者は“ブランド名の認識”で役割が逆にならないよう注意。\n【空間分析(Spatial Analysis, Azure AI Vision)】“ライブ カメラ ストリーム”内の人の存在/移動/計数/滞留をリアルタイム検出(PersonCount/CrossingLine/Distance 等)。エッジ コンテナーで動くことが多い。\n【違い】『録画の総合インサイト→Video Indexer』『ライブの人物プレゼンス/動線→Spatial Analysis』。"
},
{
  term:"OCR（Read）と Document Intelligence の違い", cat:"ビジョン",
  aliases:["Read（OCR）API","OCR と Document Intelligence の違い","OCR","ReadResult","境界ポリゴン","2023-02-01-preview"],
  body:"どちらも文字を扱うが返すものが違う。\n【Read(OCR)】画像/文書から“文字を座標付きで読む”だけ(pages>lines>words＋境界座標)。印刷/手書き両対応、大規模/複数ページは非同期(開始→結果ポーリング)。\n【ReadResult の階層構造】ReadResult はページのリストを含み、各ページはライン(line)のリストを、各ラインは単語(word)と境界ポリゴン座標・信頼度スコアを含む——page > line > word という 3 段階の階層。\n【境界領域の表現形式】API バージョン 2023-02-01-preview 以降、境界領域は軸並行の境界ボックス(x, y, w, h)ではなく、x,y 点のリストからなる“ポリゴン”として返される。回転・スキューしたテキストも正確に囲めるようにするための変更。\n【言語サポートの非対称性】印刷文字認識は最新 GA モデルで 164 言語をサポートするが、手書き認識がサポートするのは英語・簡体字中国語・フランス語・ドイツ語・イタリア語・日本語・韓国語・ポルトガル語・スペイン語など約 9 言語のみで、印刷と同じ言語セットではない。\n【同期 vs 非同期のパス】Image Analysis 4.0 の同期 Read パスはラベルやスクリーンショットなど文書以外の“単一画像”向けの高速 API。マルチページ PDF のような文書には、Document Intelligence 側の“非同期”Read パスを使う——POST で解析を開始し、レスポンスの operation-location ヘッダーが返すURLを 'succeeded' になるまでポーリングして結果を取得する(JSONボディにポーリング用URLが含まれるわけではない)。\n【Document Intelligence】読み取りに加え“この値は合計、これは日付”という構造(key-value/テーブル/フィールド)まで返す。\n【違い】OCR=文字の読み取り止まり、Document Intelligence=意味付き構造抽出。領収書/請求書の“特定フィールド”を最小開発で取るなら prebuilt(Document Intelligence)。"
},

/* ===== 自然言語処理 ================================================== */
{
  term:"Language 機能の使い分け（キー フレーズ / 要約 / NER / PII / エンティティ リンク）", cat:"自然言語",
  aliases:["言語検出（Language Detection）","キー フレーズ抽出","エンティティ リンク","PII 検出","NER","リダクション","33カテゴリ"],
  body:"“何を返すか”で選ぶ。\n【キー フレーズ抽出】重要な語句(主に名詞句)の一覧を返す。\n【要約(Summarization)】Extractive=原文から重要“文”を選抜、Abstractive=新たに要約“文”を生成。返すのは文であってキー フレーズではない。\n【NER(名前付きエンティティ認識)】Person/Location/Organization/DateTime 等“型付きエンティティ”を抽出するが、SSN やクレジットカード番号のような金融識別子を特に対象とはせず、リダクション(伏せ字化)も行わない。\n【PII 検出】SSN・パスポート番号・クレジットカード番号を含む 33 種類の PII カテゴリを認識する。必要なカテゴリだけにフィルタでき、出力テキスト中で検出された PII を伏せ字にする“リダクション”をサポートするため、法的文書の機微情報を保管前に伏せ字化するような要件に直接使える。\n【エンティティ リンク】語句を Wikipedia 等の固有記事に結び付け曖昧性解消(NER が型抽出なのに対し、こちらは実体特定＋URL)。\n【混同ポイント】要約(文)とキー フレーズ(語句)、NER(型抽出)とエンティティ リンク(実体特定)の違いが頻出。『個人情報を伏せ字化したい→PII 検出のリダクション』であって、NER や キー フレーズ抽出では代替できない。言語検出は判別不能時に '(Unknown)'＋スコア 0 を返す(例外ではない)。"
},
{
  term:"感情分析の集約ルール と オピニオン マイニング", cat:"自然言語",
  aliases:["感情分析の階層","オピニオン マイニング","opinion mining","opinionMining=true","アスペクトベースのセンチメント","target/assessment/sentiment"],
  body:"【文書レベルの集約】document と各 sentence に positive/neutral/negative の信頼度とラベルを返す。肯定＋中立のみ→positive、肯定と否定が共存→mixed、全て中立→neutral、否定が支配→negative。標準センチメント分析は文書全体・文単位のセンチメントは返すが、特定のターゲット実体(例:「the battery life」)とそれに対する感情は識別しない。\n【オピニオン マイニング(アスペクトベースのセンチメント)】リクエストで opinionMining=true を渡すことで有効化され、target(対象=料理/接客/battery life 等)・assessment(評価語)・sentiment(極性)の三項組を返す。製品レビューの中で特定の機能に言及し、それに対して特にネガティブ/ポジティブな感情が表明されていることを識別したい場合はこちらを使う。キー フレーズ抽出や固有表現抽出では、重要語句や実体は取れてもセンチメントとの関連付けはできない。\n【違い】文書レベル感情分析は全体傾向のみ、オピニオン マイニングは観点ごとに分解。『料理は最高だが接客は最悪』を分けたいなら後者。"
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
  aliases:["SSML 主要タグ","カスタム ボイス / カスタム スピーチ","SSML","say-as","format属性"],
  body:"【SSML(音声合成マークアップ言語)】既存ボイスの“発話を制御”する XML。<voice>話者切替、<prosody>速度/高さ/音量、<break>休止、<say-as interpret-as='ordinal|date|telephone|date' format='ymd'>読み解釈(format属性で日付の年月日順などを指定)、<phoneme>発音記号、<lexicon>辞書。序数/日付の読み分けやアクセント調整はここ。日付「2026-05-01」を桁ごとでなく「2026年5月1日」と読ませたい場合は`<say-as interpret-as='date' format='ymd'>`を使う——`<prosody>`は速度/ピッチ/音量の調整でありテキストの解釈方法は変えず、`<break>`はポーズ挿入で発音は変えず、`<phoneme>`は個別単語のIPA発音指定であり日付文字列全体の手動転写は非現実的。\n【カスタム ニューラル ボイス】“独自話者の声そのもの”を学習して作る(TTS)。\n【カスタム スピーチ】専門用語/方言に強い“独自の音声認識(STT)”を学習。\n【違い】SSML=既存音声の読み方制御、カスタム ボイス=新しい声を作る、カスタム スピーチ=聞き取り精度を上げる。目的が三者三様。"
},
{
  term:"Speaker Recognition（Identification と Verification: text-dependent/independent）", cat:"自然言語",
  aliases:["Speaker Recognition の体系","text-dependent","text-independent","Speaker Identification","Speaker Verification"],
  body:"話者関連の機能は 2 系統。\n【Speaker Identification(識別, 1:N)】登録済み話者グループの中から“発話者が誰か”を特定。会議で発話者を当てる用途。\n【Speaker Verification(検証, 1:1)】主張した“本人かどうか”を照合。さらに text-dependent=登録/検証で同じパスフレーズが必要、text-independent=任意の発話で検証可。\n【違い】『グループから誰かを特定→Identification』『本人確認→Verification』。パスフレーズ固定なら text-dependent、自由発話なら text-independent。いずれも事前に音声プロファイルへ enrollment(登録)が必要。"
},
{
  term:"Translator の機能（テキスト/ドキュメント/音訳/辞書/カスタム）と BLEU", cat:"自然言語",
  aliases:["カスタム翻訳（Custom Translator）","Transliteration","音訳","Dictionary Lookup","Document Translation","glossary（用語集TSV）","category ID"],
  body:"Azure Translator の機能差。\n【テキスト翻訳】文字列を同期で翻訳(短文向け)。プレーンテキストの文字列を扱うため、Word文書などをそのまま貼り付けて送ると書式はすべて失われる。\n【ドキュメント翻訳】ソースとターゲットの Azure Blob Storage “コンテナ URI”を受け取る非同期バッチ API。Word(.docx)などの書式を保持したまま翻訳し、翻訳された文書をターゲットコンテナに書き込む。200ページの文書を書式そのままで一括翻訳したい、といった要件に対応する。source 言語を指定すると品質が安定。\n【音訳(Transliteration)】文字体系の変換(例: 日本語→ローマ字)であって翻訳ではない。\n【辞書参照(Dictionary Lookup)】単語の代替訳語/用例を返す(語単位)。\n【カスタム翻訳(Custom Translator)】対訳文書で独自ドメイン モデルを学習・改善・発行。\n【glossary(用語集)パラメーターによる即時修正】Document Translationのリクエストでglossaryパラメーター経由でTSV形式の用語集ファイルを適用すると、特定のソース用語を指定した訳語へ直接マッピングでき、ニューラルモデルの既定出力を上書きできる。特定用語の誤訳を再学習なしで最速に直したい場合はこちらを使う——数百件のパラレル文を追加してCustom Translatorモデルを再学習するのはデータ準備と学習時間を要し最速ではなく、category ID(学習済みモデルバージョンの参照)の変更だけでは特定用語の誤訳は直らず、ユーザー修正から翻訳を自動更新するフィードバックAPIも存在しない。\n【BLEU スコア】カスタム翻訳の品質評価で 0〜100(高いほど参照訳に近い、実用域 40〜60)。素の定義は 0〜1 だが Custom Translator の表示は 0〜100。\n【違い】『書式付き文書丸ごと→ドキュメント翻訳』『短文→テキスト翻訳』『読みの表記変換→音訳』。"
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
  aliases:["ベクター検索とハイブリッド","統合ベクトル化","フィールド属性","simple vs full Lucene 構文","facetable","filterable","sortable","HNSW","vectorizer構成","クエリ時の自動埋め込み"],
  body:"【ベクター検索】埋め込みを格納する vector フィールド＋近似最近傍アルゴリズム(HNSW 等)を含むベクター プロファイルが“必須”。クエリはベクトル化して近傍探索。キーワード(BM25)＋ベクターの“ハイブリッド”＋セマンティック再ランクで精度が上がる。\n【統合ベクトル化】取り込み時に Text Split＋AzureOpenAIEmbedding スキルでチャンク化/埋め込みを自動生成し、クエリ時も vectorizer で自動ベクトル化(自作パイプライン不要)。具体的には、ベクター配列を提供せずに標準の検索REST APIでテキストクエリを送信すると、ベクトル検索が実行される前にインデックスのvectorizer構成(Azure OpenAI埋め込みデプロイ等を指す)を使ってテキストクエリが自動的に埋め込みベクトル化される——この処理は同期的で、別途の埋め込みAPI呼び出しは不要になる。統合ベクトル化が構成されている場合、クエリが純粋なBM25キーワード検索にフォールバックすることはなく、400 Bad Requestで拒否されて事前計算済みベクトルの明示提供を要求されることもなく、ジョブIDを返す非同期処理でポーリングが必要になることもない。\n【フィールド属性】searchable(全文)/filterable($filter)/sortable($orderby)/facetable(件数集計)/retrievable(返却)/key(主キー)。役割ごとに付与。\n【simple vs full Lucene】simple は基本演算子、full は正規表現/あいまい(~)/近接など高度。ワイルドカードは simple では接尾中心、先頭一致は full/正規表現が必要。\n【混同ポイント】ファセット件数＝facetable、絞り込み＝filterable、並べ替え＝sortable。"
},
{
  term:"ナレッジ ストアの 3 プロジェクション（object/table/file）", cat:"ナレッジ",
  aliases:["3 種のプロジェクション","ナレッジ ストア","table projection"],
  body:"【ナレッジ ストア】AI Search のエンリッチ結果を Azure Storage に保存する仕組みで、検索インデックスとは“別の出力先”。\n【object projection】JSON BLOB として保存。\n【table projection】行/列に分解しリレーショナル保存＝Power BI 等での分析に向く。\n【file projection】抽出画像などのバイナリを保存。\n【混同ポイント】“テーブル形式で分析したい”なら table projection。スコアリング プロファイルやセマンティック ランカーは検索品質の機能でありデータ保存先ではない。"
},
{
  term:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", cat:"ナレッジ",
  aliases:["prebuilt モデル","Read / Layout / 事前構築 / カスタム","template vs neural","合成（composed）モデル","prebuilt invoice モデル","prebuilt と custom の併用","General Document モデルの非推奨","Layout モデル","一般ドキュメント モデル","neural カスタム","template カスタム","W-2事前構築済みモデル","フィールドあたり10-20件","ラベル付きインスタンス不足"],
  body:"用途の“粒度”でモデルを選ぶ。\n【Read】テキストと言語検出のみ抽出し、テーブルや構造分析は行わない(手書き対応)。\n【Layout】テキスト＋テーブル＋選択マーク＋見出し構造＋段落レイアウトを抽出(新版は key-value も)。複数ページ PDF の構造保持に最適で、カスタム モデル学習の基盤としても文書化されている——混合PDFからテキスト/テーブル/見出し構造を抜き出しカスタムモデルの学習データにしたい場合はまず Layout を使う。\n【一般ドキュメント(General Document)】汎用 key-value 抽出。ただし新バージョンで“非推奨/置換”(KVP は Layout に統合)。\n【prebuilt(Invoice/ID Document/領収書/名刺/W-2 等)】特定種別の“意味付きフィールド”を学習済みで抽出。学習不要。Invoice モデルはベンダー名・請求書日付・明細項目・小計・合計を抽出、ID Document モデルはパスポートや運転免許証から名前・住所・生年月日・文書番号を抽出、W-2事前構築済みモデルは米国の税務フォームW-2からボックスレベルのフィールド(賃金・源泉徴収された連邦所得税・社会保障賃金等)をカスタム学習なしで抽出する——いずれも用途が明確に異なり取り違えやすい。\n【custom】独自帳票をラベル学習。template=同一レイアウト前提で高速・少数、neural=可変レイアウトに強く汎化。カスタムニューラルモデルの学習データはJPEG/PNG/BMP/TIFF/PDFをサポートし、ドキュメントは最低5件からだが、本番品質を得るには少なくとも10-20件のラベル付きサンプルドキュメントが推奨される。フィールドレベルの再現率が低い場合、多くはそのフィールドのラベル付きインスタンスが3-4件などと不足していることが根本原因で、モデルアーキテクチャの制限ではなくラベル付きドキュメントを増やすことが是正措置になる。\n【composed】複数カスタム モデルを 1 つのモデル ID に結合する。文書を解析する際、composed model はどのサブモデルが入力に最も合致するかを自動的に分類して適用するため、10社の異なるレイアウトを持つベンダーの請求書のように“1つのモデルIDで複数の異なるレイアウトを扱いたい”場合に使う——カスタム テンプレート モデル単体や prebuilt モデルのフィールド オーバーライドでは、この自動分類はできない。\n【混同ポイント】『構造(表/選択マーク)保持→Layout』『定型の特定フィールド→prebuilt(Invoice/ID Documentで対象が違う)』『独自かつ可変レイアウト→neural custom』『複数ベンダー/レイアウトを1エンドポイントに→composed』。一般ドキュメントは新規採用しない。"
},
{
  term:"Content Understanding と Document Intelligence / Vision の違い", cat:"ナレッジ",
  aliases:["Azure Content Understanding","video analyzer","JSON Schema（Content Understanding）","セグメント単位の出力"],
  body:"【Azure Content Understanding】フォーム/文書/画像/ビデオ/オーディオを横断して、定義した出力スキーマに沿う構造化情報(フィールド/分類/要約/計数)を抽出する“マルチモーダル”サービス。\n【スキーマ駆動・セグメント単位の動画分析】video analyzer を使うと、開発者が定義した JSON Schema に合わせて、トランスクリプト・視覚分析・音声を統合しつつ“セグメント(例: 30秒区切り)単位”の出力を返せる。会議録画から各シーンのトピック・話者数・セグメントごとの文字起こし要約を、カスタムモデルの学習なしに抽出したい、といった任意スキーマの要件に向く。\n【Video Indexer との違い】Video Indexer は豊富なインサイトを返すが“スキーマは固定”で、セグメント単位の任意カスタム抽出スキーマはサポートしない。柔軟な出力形式が必要なら Content Understanding を選ぶ。\n【違い】Document Intelligence は“文書(請求書/フォーム等)”特化でビデオ/オーディオは扱わない。Azure AI Vision は画像/一部ビデオの視覚解析(タグ/物体/OCR)で統合的マルチモーダル抽出ではない。\n【使い分け】『画像＋ビデオ＋オーディオ＋文書を横断し構造化(例: 棚画像から商品数)→Content Understanding』『文書のフィールド抽出→Document Intelligence』『画像の視覚解析→Vision』『動画をカスタムスキーマ+セグメント単位で分析→Content Understanding の video analyzer』。"
},

/* ===== 開発ツール・SDK =============================================== */
{
  term:"開発環境（Visual Studio / VS Code / Foundry Toolkit / GitHub Copilot）", cat:"計画・基盤",
  aliases:["Visual Studio vs VS Code","開発環境の選択（Visual Studio と VS Code）","Foundry Toolkit for VS Code"],
  body:"【Visual Studio】.NET/Windows 開発に強い本格 IDE。\n【VS Code】多言語・クロスプラットフォームの軽量エディター。オープンソース/Web 開発者向け。どちらも Azure の AI 開発に適する。\n【Foundry Toolkit(VS Code 拡張)】プロジェクト リソース(モデル/エージェント/接続/ベクター ストア)の参照・管理、モデル カタログからのデプロイ、統合プレイグラウンドでのテスト、ビジュアル デザイナー＋YAML による宣言型/ホスト型エージェント構成、エージェント接続用の統合コード生成を行う。\n【GitHub / GitHub Copilot】GitHub はソース管理/DevOps の主要基盤で VS/VS Code にネイティブ統合、Copilot は AI ペア プログラマー。\n【混同ポイント】“Foundry プロジェクト資産を VS Code で扱う拡張”は Python 拡張でも Copilot でもなく Foundry Toolkit。"
},
{
  term:"SDK/API（Foundry SDK / OpenAI API / Foundry Tools SDK）と対応言語", cat:"計画・基盤",
  aliases:["Foundry で使う API/SDK","Foundry SDK と CI/CD","Foundry Tools（事前統合ツール）"],
  body:"【Microsoft Foundry SDK】Foundry プロジェクトに接続し、エージェントや Foundry IQ など“Foundry 固有資産”へアクセス。DevOps パイプラインでの CI/CD 自動化(資産の作成/管理)にも使う。\n【OpenAI API/SDK】OpenAI 構文をサポートする Foundry モデルでチャット等を構築(Chat Completions/Responses)。\n【Foundry Tools SDK】Language/Speech/Translator/Doc Intelligence 等“AI サービス固有”のライブラリ。REST でも利用可。\n【Foundry Tools(事前統合ツール)とは何か】Foundry Tools の Azure Document Intelligence や Foundry Tools の Azure Speech のように、スタンドアロンのリソースとして個別にプロビジョニングするのではなく、Foundry ポータルに事前統合されたツール群として公開され、Foundry プロジェクトの接続を介してアクセスできるサービスを指す。Azure Cognitive Search(クラシック、AI Search の前身)、Power BI Embedded、Azure Logic Apps はいずれも Foundry Tools ではなく別個の Azure サービスであり、混同しやすい。\n【対応言語】C#・Python・Node・TypeScript・Java など(Ruby は資料の主要列挙に含まれない)。\n【混同ポイント】『Foundry 固有(エージェント/IQ)→Foundry SDK』『OpenAI 構文→OpenAI SDK』『既製ツール→Foundry Tools SDK』『ポータルに事前統合済みのAIサービス→Foundry Tools(Document Intelligence/Speech等、Cognitive Search classicやPower BI Embedded/Logic Appsは該当しない)』。ポータルは視覚的操作、コードの自動化は SDK。"
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

/* ===== アプリ開発（SDK/エンドポイント/認証/チャットAPI） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", cat:"アプリ開発",
  aliases:["AIProjectClient","azure-ai-projects","get_openai_client","Foundry SDK vs OpenAI SDK","project_client"],
  body:"Microsoft Foundry で AI アプリを作る 2 つの道具の使い分け。\n【Foundry SDK(AIProjectClient)】Foundry“固有”機能に使う: エージェントの構築/管理(Agent Service)、ツール呼び出しと承認のワークフロー、クラウド評価、トレースと可観測性、Foundry ダイレクト モデル(Azure OpenAI 以外のモデル)へのアクセス、プロジェクトのメタデータ/接続/ガバナンス。\n【OpenAI SDK】OpenAI API との最大互換性が要る場合に使う: 既存 OpenAI コード資産の流用、OpenAI/Azure OpenAI 間の移植性、Chat Completions/Responses/画像 API、Foundry 固有概念への依存を最小化したい場合。\n【橋渡し】Foundry SDK の `project_client.get_openai_client()` を呼べば、そこから OpenAI 互換のチャット クライアントを取得でき、1 つのアプリで両 SDK を併用できる(プロジェクト機能は Foundry SDK、モデル推論は OpenAI SDK、という組み合わせが典型)。\n【パッケージ依存】Python で Foundry SDK(`azure-ai-projects`)を使ってチャットするには、`openai` パッケージも別途インストールが必要(Foundry SDK のチャット機能は OpenAI SDK 由来のため)。\n【混同ポイント】『エージェント/評価/トレースが要る→Foundry SDK』『OpenAI 互換性/移植性が最優先→OpenAI SDK』。どちらも同じ Foundry プロジェクト エンドポイントで動作でき、排他的ではない。"
},
{
  term:"Responses API と ChatCompletions API の違い", cat:"アプリ開発",
  aliases:["Responses API","ChatCompletions API","previous_response_id","output_text","responses.create","chat.completions.create"],
  body:"OpenAI 互換クライアントが提供する 2 つのチャット API。\n【Responses API(推奨)】以前は別々だった ChatCompletions と Assistants の機能を統合。“ステートフル”——`previous_response_id` に直前の応答 ID を渡すだけで会話の文脈が自動的に維持される(履歴をアプリ側で組み立て直す必要がない)。Azure OpenAI モデルだけでなく Microsoft Phi や DeepSeek などの“Foundry ダイレクト モデル”とも連携できる。呼び出しは `client.responses.create(model=..., instructions=..., input=...)`、結果は `response.output_text` で取得。\n【ChatCompletions API】“ステートレス”——`messages=[{role:system/user/assistant, content:...}, ...]` という JSON 配列を毎回まるごと送る必要があり、会話履歴の保持はアプリ側で手動管理する。多くのモデル/プラットフォーム間で長年使われ広く互換性がある。呼び出しは `client.chat.completions.create(model=..., messages=[...])`、結果は `completion.choices[0].message.content` で取得。\n【混同ポイント】『新規プロジェクトで文脈維持を楽にしたい→Responses(previous_response_id)』『既存コード資産や幅広いプラットフォーム互換性が要る→ChatCompletions(手動でmessages配列を積む)』。結果の取り出し方(`output_text` vs `choices[0].message.content`)や引数名(`input` vs `messages`、`instructions` vs systemロールメッセージ)も紛らわしいので要区別。"
},
{
  term:"クライアント認証（Microsoft Entra ID / API キー / 環境変数）", cat:"アプリ開発",
  aliases:["DefaultAzureCredential","get_bearer_token_provider","az login","トークン プロバイダー","AZURE_OPENAI_API_KEY"],
  body:"クライアント アプリが Foundry/Azure OpenAI エンドポイントに認証する方法は複数ある。\n【Microsoft Entra ID 認証(運用で推奨)】`DefaultAzureCredential` ＋ `get_bearer_token_provider(credential, \"https://ai.azure.com/.default\")` でベアラー トークン プロバイダーを作り、それを `api_key` 引数としてクライアントに渡す(実体はキーではなくトークン)。ローカル開発では事前に `az login` でサインインしておく必要がある。\n【API キー認証】環境変数(例: `AZURE_OPENAI_API_KEY`)等からキー文字列を読み込み、そのまま渡す。手軽だがキー漏えいリスクがあり、コードに直接ハードコードしてはならない。\n【環境変数の自動認識】`OPENAI_BASE_URL` と `OPENAI_API_KEY` を環境変数として設定しておけば、引数なしで `OpenAI()` を呼ぶだけでクライアントが自動的にそれらを使う。\n【混同ポイント】『本番運用→Entra ID(トークン プロバイダー)』『簡易検証→キーまたは環境変数』。Entra ID 方式でも `api_key` という同じ引数名にトークン プロバイダーを渡す点(名前と実体が一致しないように見える)が紛らわしい。"
},
{
  term:"ストリーミング応答と非同期クライアント（stream=True / AsyncOpenAI）", cat:"アプリ開発",
  aliases:["stream=True","AsyncOpenAI","response.output_text.delta","非同期クライアント"],
  body:"応答性の高いチャット アプリを作るための 2 つの独立した手段。\n【ストリーミング(stream=True)】応答をまとめて待つのではなく、生成され次第“少しずつ”受け取る。Responses API では `response.output_text.delta` イベントで断片を、`response.completed` イベントで最終的な応答 ID を受け取る。長い応答でもユーザーは待ち時間を体感しにくい。\n【非同期クライアント(AsyncOpenAI)】`OpenAI` の代わりに `AsyncOpenAI` を使い、各 API 呼び出しに `await` を付ける。長時間実行の要求や、アプリをブロックせず複数要求を同時処理したい場合に有効。\n【違い】ストリーミングは“応答の受け取り方(逐次か一括か)”、非同期は“呼び出しの実行モデル(ブロッキングか否か)”という別の軸。両者は独立しており、非同期ストリーミングのように組み合わせて使うこともできる。\n【混同ポイント】『UIをフリーズさせず部分表示したい→ストリーミング』『重い処理中も他のリクエストを並行処理したい→非同期』。どちらか一方だけでは他方の課題は解決しない。"
},
{
  term:"コンテキスト ウィンドウに含まれる要素とトークン消費", cat:"アプリ開発",
  aliases:["コンテキスト ウィンドウ","トークン使用量","conversation_history"],
  body:"1 回の推論実行でモデルに送られる“コンテキスト ウィンドウ”には、次のものがすべて連結され、トークン化されて送信される。\n① システムの指示(instructions、安全規則)\n② 現在のプロンプト\n③ 会話履歴(これまでのユーザー/アシスタントのやり取り)\n④ ツール スキーマ(関数/OpenAPI 仕様/MCP ツールの定義)\n⑤ ツール出力(検索結果・コード実行結果・ファイル内容など)\n⑥ 取得されたメモリ/ドキュメント(メモリ ストア・RAG・ファイル検索から)\n【重要な誤解ポイント】Responses API の `previous_response_id` は“会話履歴を毎回書き直す手間”を無くす便利機能であって、これを使えばトークン消費が自動的に安くなるわけではない——結局、上記の履歴やツール関連情報は毎回まとめてモデルに送られるため、会話が長引くほどトークン使用量は増えていく。SDK は状態“管理”を助けるだけで、コスト最適化は別途考える必要がある。"
}
]);

/* ===== 追加バッチ: Vision 4.0 / Language カスタム / Speech / function calling / クォータ ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Image Analysis 4.0 の視覚機能（キャプション/密集キャプション/タグ/物体/人物/スマート クロップ/背景除去）", cat:"ビジョン",
  aliases:["キャプション","密集キャプション","dense captions","スマート クロップ","smart crop","背景除去","background removal","Image Analysis","Vectorize Image","Vectorize Text","マルチモーダル埋め込み","20 MB","16,000 x 16,000"],
  body:"Azure AI Vision の Image Analysis 4.0 が提供する視覚機能の一覧と役割。\n【キャプション(caption)】画像“全体”を説明する自然言語の 1 文を生成(信頼度スコア付き)。\n【密集キャプション(dense captions)】画像内の最大 10 の領域それぞれに個別の説明文を生成。全体 1 文のキャプションとの違いは“領域ごとに複数”出る点。\n【タグ(tags)】画像に写る物体・動作などを示す単語ラベルの一覧(数千種類の認識語彙)。文章ではなく語の列挙。\n【物体検出(objects)】ラベル＋バウンディング ボックス座標。\n【人物検出(people)】画像内の人の位置(ボックス)を返す。\n【read】画像内の文字を OCR で読み取る(Read API と同等の文字抽出)。キャプション/タグとは別軸の“テキスト抽出”機能。\n【スマート クロップ(smart crops)】画像の“重要な領域”を自動判別し、指定したアスペクト比で最適なサムネイル切り出し領域を提案する。単純な中央切り抜きと違い、被写体が端に居ても外さない。\n【背景除去(background removal)】前景の被写体を切り出すマスク(前景マット)を生成。\n【入力の上限】URL 入力の最大ファイル サイズは 20 MB(30 MB のような大きい画像は拒否される)。画像の寸法上限は 16,000 x 16,000 ピクセル。PNG/JPEG 等の主要形式はサポートされている。\n【マルチモーダル埋め込み(Vectorize Image / Vectorize Text)】画像とテキストを“同一のセマンティック ベクトル空間”にマップするエンドポイント。「赤いスポーツカー」のようなテキストクエリで視覚的に近い画像を検索する、クロスモーダルな類似検索を可能にする。dense captions で文章化してから埋め込み比較する 2 段階の回避策とは異なり、統合的な埋め込みで直接比較できる。\n【混同ポイント】『全体を 1 文で→キャプション』『領域ごとに複数の説明→密集キャプション』『単語ラベルの列挙→タグ』『文字の読み取り→read』『サムネイル用の切り出し→スマート クロップ』『クロスモーダル類似検索→Vectorize Image/Text』。URL 入力は 20 MB 上限、寸法は 16,000×16,000px 上限という数値も要注意。"
},
{
  term:"Language のカスタム モデル（カスタム テキスト分類 と カスタム NER）", cat:"自然言語",
  aliases:["カスタム テキスト分類","カスタム NER","カスタム固有表現認識","単一ラベル分類 vs 複数ラベル分類"],
  body:"Azure AI Language では独自データでカスタム モデルを学習できる。代表が 2 つ。\n【カスタム テキスト分類】文書“全体”を独自カテゴリに分類する。プロジェクト作成時に『単一ラベル分類(1 文書に 1 カテゴリ)』か『複数ラベル分類(1 文書に複数カテゴリ可)』を選ぶ——Custom Vision の Multiclass/Multilabel と同じ発想の区別。\n【カスタム NER(固有表現認識)】文書“内の断片”から独自定義のエンティティ型(例: 契約書の当事者名・貸付金額・担保物件)をラベル学習して抽出する。\n【事前構築 NER との違い】事前構築 NER は Person/Location/Organization など一般的な型のみ。業務固有の型を抽出したければカスタム NER が必要。\n【混同ポイント】『文書→カテゴリを付ける=分類』『文書内の語句→型付きで抜き出す=NER』。どちらもラベル付きデータでの学習・Language Studio でのプロジェクト管理が必要。"
},
{
  term:"要約（抽出型 と 抽象型）", cat:"自然言語",
  aliases:["抽出型要約","抽象型要約","extractive summarization","abstractive summarization","言語の要約"],
  body:"Azure AI Language の要約には 2 方式ある。\n【抽出型要約(extractive)】原文から“重要な文をそのまま”選び出して要約とする。各文に重要度(rank)スコアが付き、原文にある表現しか含まれない。\n【抽象型要約(abstractive)】内容を理解した上で“新しい文章を生成”して要約する。原文にない言い回しが現れ得る、より人間的な要約。\n【会話要約】通話やチャットの記録向けに、章立て(chapter)や要点(narrative)などの形式で要約する機能もある。\n【混同ポイント】『原文の文を選抜→抽出型』『新規に文章を生成→抽象型』。また“キー フレーズ抽出”は語句の列挙であって文の要約ではない——返るものが『語句 vs 文』で異なる。"
},
{
  term:"Speech SDK の認識パターン（RecognizeOnce と 連続認識）と音声翻訳・出力形式", cat:"自然言語",
  aliases:["RecognizeOnceAsync","連続認識","StartContinuousRecognitionAsync","TranslationRecognizer","addTargetLanguage","SpeechSynthesisOutputFormat"],
  body:"Speech SDK で音声を扱う際の主要パターン。\n【RecognizeOnceAsync(単発認識)】“1 つの発話”を 1 回だけ認識する。最初の無音区切りまで、上限はおよそ 15 秒。音声コマンドや短い質問向け。\n【連続認識(StartContinuousRecognitionAsync)】明示的に停止するまで認識を続け、認識結果はイベント(recognized 等)で逐次受け取る。長い口述・会議の文字起こし向け。\n【音声翻訳(TranslationRecognizer)】SpeechTranslationConfig に addTargetLanguage を“複数回”呼ぶことで、1 つの音声入力から複数のターゲット言語への翻訳を同時に得られる。\n【音声合成の出力形式】SpeechSynthesisOutputFormat の設定で、合成音声のファイル形式やビットレート(wav/mp3 等)を指定できる。\n【混同ポイント】『短い 1 発話(~15秒)→RecognizeOnce』『止めるまで続ける→連続認識』。“複数言語へ同時翻訳できるか”→できる(ターゲット言語を複数追加)。"
},
{
  term:"Azure OpenAI の function calling 実行フロー（Responses API の実装詳細）", cat:"生成AI",
  aliases:["function calling の流れ","tools パラメーター","tool_choice","関数呼び出しフロー","function_call_output","call_id","item.type","function_call"],
  body:"function calling(関数呼び出し)は“モデルが外部関数の呼び出し方を提案し、実行はアプリが担う”仕組み。フローは 5 段階。\n① 開発者がリクエストに tools(関数の名前・説明・パラメーターの JSON スキーマ)を含める\n② モデルは関数が必要と判断すると、応答として『呼ぶべき関数名＋引数の JSON』を返す——**モデル自身は関数を実行しない**\n③ アプリ側コードがその引数で実際に関数を実行する\n④ 実行結果を tool ロールのメッセージとして会話に追加し、再度モデルへ送る\n⑤ モデルが結果を踏まえた最終応答を生成する\n【tool_choice】auto(モデル判断)/特定関数の強制/none を制御できる。\n【Responses API での実装の型】① `response.output` をループし、各要素の `item.type` が `\"function_call\"` かつ `item.name` が目的の関数名かを判定する。② 一致したら実際に関数を実行し、結果を `{\"type\": \"function_call_output\", \"call_id\": item.call_id, \"output\": 結果}` という辞書として `messages`(または `input`)に追加する。`call_id` は要求と結果を対応付けるための必須キーで、これが無いとモデルはどの呼び出しに対する結果か分からない。③ 更新した `messages` を使って再度 `responses.create()` を呼び、最終応答を得る。\n【混同ポイント】最大の誤解は『モデルが関数を実行してくれる』——実行責任は常にアプリ側。モデルが返すのは“呼び出しの指示(名前と引数)”だけ。`call_id` を付け忘れる/取り違えるのが実装時の典型的なミス。セキュリティ上も、引数は検証してから実行するのが実務の定石。"
},
{
  term:"クォータ管理（TPM の分配）と 429 エラーへの対処", cat:"計画・基盤",
  aliases:["429 エラー","レート制限","クォータ","TPM 割り当て","指数バックオフ"],
  body:"Azure OpenAI の利用量管理と、超過時のエラー対処。\n【TPM クォータの構造】クォータは“サブスクリプション×リージョン×モデル”単位で割り当てられ、その枠内で各デプロイに TPM(tokens per minute)を分配する。同じモデルのデプロイを複数作ると、限られたクォータを取り合う。RPM(requests per minute)は TPM に連動して決まる(目安: 1000 TPM あたり 6 RPM)。\n【429 Too Many Requests】割り当てたレート制限を超過すると返るエラー。対処は:\n① 指数バックオフ(exponential backoff)付きの再試行を実装する\n② デプロイへの TPM 割り当てを見直す/クォータ引き上げを申請する\n③ 負荷が恒常的に高いなら PTU(Provisioned)デプロイを検討する\n④ 要求をまとめる・不要トークンを削るなど消費自体を減らす\n【混同ポイント】429 は“認証エラー(401)”でも“リソース障害(5xx)”でもなく、**自分で設定したレート制限の超過**。まずリトライ戦略、恒常的なら容量(クォータ/PTU)の見直し、という順で考える。"
}
]);

/* ===== 追加バッチ: Responses API の組み込みツール4種 ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", cat:"アプリ開発",
  aliases:["code_interpreter","web_search","file_search（ツール）","vector_stores.create","file_search_call.results","file_batches.upload_and_poll","container auto"],
  body:"生成 AI モデルをツールで拡張する 4 つの組み込みタイプ。目的・戻り値・制限が明確に異なる。\n【code_interpreter】モデルが“Python コードを書いて実行”できるサンドボックス環境。数式計算・データ変換・CSV解析などに使う。pandas/numpy等はプレインストール済み。**外部ネットワーク アクセスは無い**(禁止事項として頻出)。tools配列では `{\"type\": \"code_interpreter\", \"container\": {\"type\": \"auto\"}}` のように container設定を伴うことが多い。\n【web_search】モデルが“インターネットを検索”して最新情報を取得できるツール。最近のイベント・価格・製品情報など、学習データに無い情報の取得に使う。取得元の品質は保証されないため重要な事実は別途検証が要る。\n【file_search】モデルが“アップロード済みファイル(ベクター ストア)”を意味的に検索できるツール。社内ポリシー文書やマニュアルなど、特定の非公開資料に根拠づけた回答をしたい場合に使う。事前に `vector_stores.create()` でストアを作り、`file_batches.upload_and_poll()` でファイルを登録し、tools配列で `vector_store_ids` を指定する。\n【function】モデルが“アプリ独自の関数”を呼び出す(呼び出し指示を出すだけで実行はしない)ツール。外部API・DB・業務ロジックとの連携に使う。\n【混同ポイント】『最新のWeb情報が要る→web_search』『自社の特定文書に根拠づけたい→file_search』『計算/データ処理を実行させたい→code_interpreter』『独自システムを呼びたい→function』。file_search は“アップロードした特定ファイル集合”への固定に強いが、複数のデータ ストアにまたがる大規模エンタープライズ検索には Foundry IQ(ナレッジの中央集約)を検討する。"
},
{
  term:"ツール選択の既定動作（モデルが自律的に選ぶ）と instructions によるガイド", cat:"アプリ開発",
  aliases:["ツール選択規則","tools配列の指定方法"],
  body:"tools配列で複数ツールを渡した場合、既定では“どのツールをいつ使うか(あるいは使わないか)”は**モデルがプロンプト内容から自律的に判断**する——開発者が毎回明示的に指定する必要はない。\n【ガイド方法】この既定の選択挙動は、instructions(システム プロンプト)パラメーターで誘導できる。例えば「最新情報が必要な場合は web_search を使う」のように指示すると、モデルはその方針に沿ってツール使用を判断しやすくなる。\n【混同ポイント】『毎回のプロンプトでツールを明示的に選ばないと使われない』は誤り——複数ツールを一度に渡しておき、モデルに判断させるのが基本パターン。厳密に制御したい場合のみ tool_choice で特定ツールの強制/禁止を行う。"
}
]);

/* ===== 追加バッチ: Foundry ハブ階層・ガバナンス・運用（Udemy教材由来） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", cat:"計画・基盤",
  aliases:["Foundry ハブ","az ml workspace create","kind=Hub","Azure AI Foundry","Microsoft.MachineLearningServices/workspaces","分離モードの変更不可","soft delete","purge protection","論理的削除","消去保護"],
  body:"【旧称】Microsoft Foundry は、以前は「Azure AI Foundry」と呼ばれていた（試験では旧名称を問う設問がある）。\n【ハブの正体】Foundry の「ハブ」は、実体としては Azure Machine Learning ワークスペース(リソース種類 `Microsoft.MachineLearningServices/workspaces`)の一種で、kind が Hub に設定されたもの。CLIで作成するコマンドは `az ml workspace create --kind hub` であり、`az ai foundry create` のような専用コマンド グループは存在しない。\n【常に作成される共有インフラ】ハブをプロビジョニングすると、アーティファクト保存用の Azure Storage アカウント(トレーニングデータ/モデルアーティファクト/実験出力用)と、シークレット管理用の Azure Key Vault(接続資格情報用)は“常に”自動作成される。AKS クラスター・Azure Container Registry・Azure AI Search のインデックスは、必要に応じて個別にアタッチ/接続するオプションであり、ハブ作成時に自動プロビジョニングされるものではない。\n【ハブとプロジェクトの関係】ハブは複数プロジェクトの“親”で、ストレージ アカウントや Key Vault など共有インフラを提供する。プロジェクトはハブの“子”リソースとしてストレージ/Key Vaultを継承するが、コンピュート ターゲット・デプロイ・実験の追跡は各プロジェクトごとに独立している。\n【複数チームでの共有】1つのハブを複数チームで共有しつつ分離したい場合、正しい設計は「1つのハブに複数プロジェクトを作り、プロジェクト単位でロールを割り当てる」こと。チームごとに別ハブを作ると共有インフラの利点(コスト集約・一元管理)が失われる。\n【コスト配分】プロジェクトごとに Azure リソース タグを付与し、Azure Cost Management でチーム別コストを追跡するのが推奨されるコスト配分方法。命名規則だけに頼った手動集計はエラーが起きやすく推奨されない。\n【暗号化(CMK)の影響と前提条件】ハブ作成時にカスタマー マネージド キー(CMK)暗号化を有効にした場合、そのキーが Key Vault で失効すると、ハブのマネージド IDは保存データの復号(キー アンラップ)ができなくなり、ハブ内のすべての暗号化データへのアクセスが事実上ロックされる（自動フォールバックや猶予キャッシュは存在しない）。CMK暗号化を有効化する前提条件として、キーを保持する Key Vault で論理的削除(soft delete)と消去保護(purge protection)を有効化しておく必要がある——これがキーの誤削除・消去による暗号化データ喪失を防ぐ。CMKに使うキーは RSA キーで対称(AES)キーは使用できず、ハブのマネージド IDにはキーの取得(get)・ラップ・アンラップの権限を付与すれば足り、Key Vault Administratorロールのような広範な権限は過剰。\n【ネットワーク分離】マネージド VNet 分離を有効にしたハブから、特定の内部 FQDN(社内 REST API 等)へのアウトバウンド アクセスを許可したい場合は、マネージド VNet 構成に「ターゲット FQDN を指定したカスタム アウトバウンド ルール」を追加する。分離モードの切り替えや新規ハブの作成、DNS ゾーンへの追加では代替できない。\n【分離モードは作成時にのみ設定・変更不可】ハブのネットワーク分離モード(マネージド VNet か、顧客管理 VNet+プライベートエンドポイントか)は“ハブ作成時”に設定され、作成後にポータルの設定変更や `az ml workspace update` のようなコマンドで変更することはできない。ExpressRoute統合など、後から異なる分離モードが必要になった場合は、既存ハブを削除し、目的の分離モード構成で再作成するしかない。\n【混同ポイント】『ハブ＝共有インフラの親、プロジェクト＝個別作業の子』『常に作成→ストレージ+Key Vault(AKS/ACR/AI Searchはオプション)』『CMK失効＝ハブ全体がロックされる（新規デプロイだけでなく既存推論も含む）』『CMK有効化の前提条件→Key Vaultのsoft delete+purge protection、RSAキー』『FQDNアクセス許可＝カスタムアウトバウンドルール（ネットワークピアリングやDNSゾーンでは不可）』『分離モードは作成後変更不可→変更するにはハブの削除＋再作成が必要』。"
},
{
  term:"Foundry のロールベース アクセス制御（Azure AI Developer / Inference Deployment Operator / ハブレベル vs プロジェクトレベル）", cat:"計画・基盤",
  aliases:["Azure AI Developer ロール","Azure AI Inference Deployment Operator","ハブレベル所有者","マネージド ID 認証の推奨"],
  body:"Foundry の権限管理は「どの階層(ハブ/プロジェクト)」×「どのロール」の組み合わせで決まる。\n【推奨される認証】アプリケーション コードが Foundry リソースへアクセスする際は、API キーの直接埋め込みではなく“マネージド ID 認証”が推奨される。API キーを設定ファイルに埋め込むのは明確なアンチパターン。Key Vaultへの保存＋手動ローテーションは埋め込みよりはましだが、マネージド IDの方が望ましい。\n【ハブの共有ストレージへのアクセス】ハブのマネージド IDには、リンクされた Azure Storage アカウントへのアクセスのため「Storage Blob データ共同作成者」ロールの付与が必要。\n【プロジェクトレベルの開発者ロール】「デプロイの作成・評価の実行はできるが、ハブレベルの設定変更や他ユーザーへのロール割り当てはできない」という要件には、プロジェクトレベルの“Azure AI Developer”ロールが適する。ハブレベルの所有者(Owner)や共同作成者(Contributor)はハブ全体の管理権限まで含み過剰、一方“Azure AI Inference Deployment Operator”はモデルのデプロイ作成/削除のみが対象で評価の実行はできず不足する。\n【混同ポイント】『必要最小限の権限＝プロジェクトレベルのAzure AI Developer』『ハブレベルのOwner/Contributorは常に過剰権限』『Inference Deployment Operatorはデプロイ専用で評価は含まない』。"
},
{
  term:"PTU デプロイの監視メトリクスと分散トレーシング環境変数", cat:"モデル選定・評価",
  aliases:["PTU 利用率パーセンテージ","PTU Utilization","APPLICATIONINSIGHTS_CONNECTION_STRING","azure.ai.inference トレーシング"],
  body:"【PTU利用率のアラート】PTU(プロビジョニング済みスループット ユニット)デプロイの予約容量に対する消費割合を直接示すメトリクスは「PTU 利用率パーセンテージ」。これが持続的に90%を超えるといった監視には、このメトリクスをアラートのトリガーにする。\n【似て非なる他のメトリクス】「リクエスト レイテンシ P99」は応答速度の指標で利用率を直接反映しない。「スロットリング済みリクエスト数」は“既にPTU上限を超えて拒否された後”に増える遅行指標であり、超過の予兆を早期に掴むには不向き。「完了トークン消費レート」は消費量そのものであり、予約容量との比較（利用率）にはならない。\n【分散トレーシングの有効化】Foundry SDK(`azure.ai.inference`)のトレーシング機能は、環境変数 `APPLICATIONINSIGHTS_CONNECTION_STRING` が設定されていると、OpenTelemetry互換のスパンを各ノードの処理について自動的に発行する。`AZURE_MONITOR_CONNECTION_STRING`や`AZURE_AI_TRACING_ENDPOINT`、`OPENTELEMETRY_EXPORTER_URL`は、いずれもこの目的でFoundry SDKが実際に参照する環境変数ではない。\n【混同ポイント】『予約容量の消費割合を先読みで監視→PTU利用率パーセンテージ』『レイテンシや拒否数は利用率の直接指標ではない』『トレーシングの有効化キーはAPPLICATIONINSIGHTS_CONNECTION_STRING』。"
},
{
  term:"大規模バッチ処理向けエンドポイント種別（バッチ エンドポイント vs マネージド オンライン エンドポイント vs サーバーレスAPI）", cat:"モデル選定・評価",
  aliases:["バッチ エンドポイント","マネージド オンライン エンドポイント","コンピュートクラスター","RequestsPerMinute","CpuUtilizationPercentage","自動スケールルール","Kubernetes オンライン エンドポイント"],
  body:"大量データを“非同期・低コスト”で処理したいか、“即時応答”が必要かで選ぶエンドポイント種別が異なる。\n【バッチ エンドポイント】コンピュート クラスター上で大規模推論を非同期に実行し、Azure Blob Storageなどからの入力ファイルを処理して出力をストレージへ書き戻す。夜間バッチのような、大量の文書(例: 5万件のPDF)をまとめて処理する用途に最適。\n【マネージド オンライン エンドポイント】完全マネージドのコンテナーでモデルをホストし、常時起動インスタンスでリアルタイムの同期推論リクエストに応答する用途向け。RequestsPerMinute(1分あたりのリクエスト数)やCpuUtilizationPercentage(CPU使用率)といったメトリックに基づく独立した自動スケールルールをサポートするため、カスタムMLflowモデルのようなscikit-learn等の任意モデルをリアルタイムREST推論としてホストしトラフィック増減に応じてインスタンス数を調整したい場合に選ぶ。アイドル時間が生じる夜間バッチ処理に使うとコスト効率が悪い。\n【サーバーレスAPIデプロイ】コール単位で課金される手軽なAPIアクセスだが、Foundryモデルカタログのモデル(トークン課金)に限定されており、任意のMLflowアーティファクトのような自前モデルには対応しない。\n【Kubernetes オンライン エンドポイント】AKSまたはArc対応Kubernetesクラスターをアタッチしてモデルをデプロイする経路。「AKS Arc経由のAzure Container Appsデプロイ」のような種別はFoundryには存在しない——Kubernetes上へのデプロイは必ずKubernetesオンラインエンドポイントを介する。\n【混同ポイント】『大量データを非同期でまとめて処理したい→バッチ エンドポイント』『自動スケール付きのリアルタイムREST推論(カスタムMLflowモデル等)→マネージド オンライン エンドポイント』『Foundryカタログのモデルをトークン課金で手軽に→サーバーレスAPI』『Kubernetes上にデプロイ→Kubernetesオンラインエンドポイント(Azure Container Appsではない)』。HTTPトリガー付きのコンテナー アプリのような汎用マイクロサービス ホスティングは、Foundryのバッチ処理パターンとネイティブ統合されていない点にも注意。"
},
{
  term:"責任ある AI ガバナンスの具体的な実装手段（Azure Policy / Purview / azure.ai.evaluation）", cat:"責任ある AI",
  aliases:["Azure Policy（責任あるAI）","Microsoft Purview Information Protection","azure.ai.evaluation SDK"],
  body:"責任ある AI の“原則”を実際に運用へ落とし込む具体的な仕組み。\n【Azure Policy】非準拠なモデルのデプロイを防ぐなど、組織のルールを強制するガバナンス制御。\n【Microsoft Purview Information Protection ラベル】入力データの機微度を分類・保護するためのラベル付け。\n【azure.ai.evaluation SDK】一貫性・流暢性・グラウンディング性など、モデル出力の品質を測る組み込み評価機能を提供する。\n【ガバナンスに“含まれない”もの】ネットワーク ピアリングや自動GPUスケーリングは、可用性やレイテンシ最適化といった“インフラの課題”であり、責任あるAIガバナンスの施策そのものではない点が頻出のひっかけ。\n【混同ポイント】『ガバナンス＝Policy(強制)＋Purview(分類保護)＋evaluation SDK(品質測定)』『可用性/パフォーマンス最適化はガバナンス項目ではない』。"
}
]);

/* ===== 追加バッチ: RAG評価・prompt flow・エージェント実装詳細・マルチエージェント（Udemy教材由来 第2弾） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"prompt flow 組み込み評価器（Groundedness / Fluency / Coherence / Similarity）と Simulator", cat:"モデル選定・評価",
  aliases:["Groundedness評価器","グラウンディング性評価器","Fluency評価器","流暢性評価器","Coherence評価器","一貫性評価器","Similarity評価器","類似度評価器","Simulator","敵対的シミュレーション","TaskCompletionEvaluator"],
  body:"prompt flow / azure.ai.evaluation SDK の組み込み評価器は、それぞれ“何を測るか”がはっきり分かれている。\n【グラウンディング性(Groundedness)評価器】応答が提供された文脈文書によって裏付けられているかを測定する。RAGパイプラインの品質評価における主要な次元で、幻覚(ハルシネーション)の検出に直結する。\n【流暢性(Fluency)評価器】言語が自然で文法的に正しいかを測定する。文脈による事実裏付けは見ない。\n【一貫性(Coherence)評価器】応答が論理的・構造的にまとまっているかを評価する。\n【類似度(Similarity)評価器】生成された応答と参照(ゴールド)回答とのコサイン距離を測る。取得した文脈での事実的グラウンディングではなく、あらかじめ用意した正解例との近さを見る。\n【Simulatorクラス(敵対的シミュレーション)】ジェイルブレイク試行・プロンプトインジェクション・有害コンテンツ要求といった敵対的入力に対してエージェントをテストし、コンテンツフィルターの効果を検証する。品質評価器とは異なり“堅牢性”を測る。\n【TaskCompletionEvaluator】エージェントがユーザーの目標(タスク)を実際に達成できたかを測定する。敵対的堅牢性は測らない。\n【混同ポイント】『RAGの文脈裏付け→Groundedness』『文法・自然さ→Fluency』『論理的まとまり→Coherence』『正解例との近さ→Similarity』『攻撃耐性→Simulator』『目標達成度→TaskCompletionEvaluator』と役割で覚える。"
},
{
  term:"prompt flow のオーサリング（flow.dag.yaml / LLM ノード / Python ノード / pf CLI）", cat:"生成AI",
  aliases:["flow.dag.yaml","pf flow test","pf run create","LLMノード","Pythonノード","promptflow CLI"],
  body:"prompt flow は Foundry ポータルのビジュアルキャンバスに限らず、コードベースでも扱えるように設計されている。\n【定義ファイル】prompt flow はフローディレクトリのルートに置かれる `flow.dag.yaml` というYAMLファイルで、ノード構成とデータフローが定義される。\n【LLMノード】プロンプトテンプレートを使ってAzure OpenAIなどのモデルエンドポイントを呼び出すノード。temperatureやmax_tokensなどのパラメータをノードごとに構成できる。\n【Pythonノード】任意の処理ロジックを持つノード。prompt flowはLLMノードのみに限定されず、Pythonノードを組み合わせられる。\n【ローカル編集・実行】Foundryポータルのビジュアルキャンバスに加え、`promptflow` CLI(`pf flow test`、`pf run create`など)とエディタを使ってローカルでも編集・実行できる。マネージドエンドポイントへのデプロイ前に高速なイテレーションが可能で、“クラウドでのみ実行できる”という理解は誤り。\n【混同ポイント】『flow.dag.yamlで定義』『LLMノード＝モデル呼び出し、Pythonノード＝任意ロジック』『ポータルのビジュアルキャンバス“のみ”ではなくCLIでのローカル編集・実行も可能』。"
},
{
  term:"ハイブリッド検索と Reciprocal Rank Fusion（BM25 + ベクトル検索 + セマンティック ランカー）", cat:"ナレッジ",
  aliases:["BM25","ベクトル検索","HNSW","Reciprocal Rank Fusion","RRF","セマンティックランカー","rerankerScore","RAGインデックススキーマ","k1とb","BM25チューニングパラメータ","シノニムマップ"],
  body:"Azure AI Search の検索・ランキング関連の概念は役割がそれぞれ異なり、組み合わせて使うことで精度を高める。\n【BM25】単語頻度と逆文書頻度に基づいて文書を取得するキーワード検索。転置インデックスの語彙一致でランキングする。\n【ベクトル検索(HNSW)】グラフベースのインデックスを使ってセマンティック類似性の近似最近傍を見つける。埋め込みの類似度で並べ替える。\n【Reciprocal Rank Fusion(RRF)】BM25とベクトル検索など複数のランク済み結果リストを、逆順位の和でマージする手法。両方のリストに現れる文書を高く評価することで、キーワード精度とセマンティック再現率のバランスを取る。\n【セマンティックランカー】クロスエンコーダーモデルで(通常RRF後の)上位結果を再ランキングし、0〜4スケールのrerankerScoreを返す。\n【キーワード重視クエリでベクトル検索のみだと弱い問題】BM25拡張のみ・セマンティックランカー単独・HyDE(仮想文書埋め込み)は、いずれもBM25とベクトル検索を同時に活かす仕組みではないため、精度とセマンティック再現率を両方改善したい場合はBM25+ベクトル検索のRRFハイブリッド検索が最適。\n【'automobile'/'car'のような語彙ギャップへの対処】BM25のチューニングパラメータ(k1=用語頻度の重み、b=文書長正規化の強さ)を調整しても、これはBM25内部の語彙一致スコアリングを補正するだけで、語彙が異なる同義語(セマンティックギャップ)には対応しない。シノニムマップを想定される用語ペアごとに手動登録する方法も有効ではあるが、組み合わせを網羅する継続的なメンテナンスが必要になる。ベクトル検索なら埋め込みが自動的にセマンティックな近さを扱うため、RRFハイブリッド検索(BM25の完全一致精度+ベクトル検索の同義語カバー)が、手動メンテナンス不要で両方を満たす選択となる。\n【RAGインデックスの必須フィールド】標準的なRAGインデックススキーマには、生のチャンクコンテンツ用のテキストフィールド(BM25検索とLLMへのグラウンディング文脈提供に必須)と、埋め込みモデルの次元と一致するCollection(Edm.Single)型のベクトルフィールド(ベクトル検索に必須)が必要。地理空間用のジオメトリフィールドや有効/無効フラグのブールフィールドはRAG検索スキーマの必須要素ではない。またAzure AI Searchのキーフィールドは Edm.String 型でなければならず整数型は指定できない。\n【混同ポイント】『語彙一致→BM25』『意味的近傍→ベクトル検索(HNSW)』『複数リストのマージ→RRF』『上位結果の再ランキング→セマンティックランカー』。役割を取り違えないこと。"
},
{
  term:"Azure OpenAI ファインチューニング（対応モデル・JSONL形式・DPO）", cat:"モデル選定・評価",
  aliases:["JSONL","messages配列","DPO","Direct Preference Optimization","SFT","教師ありファインチューニング","RLHF","GPT-4o mini","インクリメンタルファインチューニング","ホールドアウト検証ファイル","過学習","validation loss","LoRAアダプタ"],
  body:"Azure OpenAIのファインチューニングは対応モデル・データ形式・手法の3点が頻出論点。\n【対応モデル】o1のような推論モデルはファインチューニング非対応。text-embedding-3-largeのような埋め込みモデルもファインチューニングは利用できない。コスト効率の良いファインチューニングにはGPT-4o miniが明確に推奨される。\n【データ形式】トレーニングデータはJSONL形式で、各行がチャット形式のmessages配列を持つJSONオブジェクトでなければならない。標準的な教師ありファインチューニング(SFT)ではuser/assistantのメッセージをrole/contentのペアで含み、systemは任意。ツール呼び出しの学習例ではcontentの代わりにtool_callsを持つassistantメッセージもあり、DPOやRFTなどの手法では必須ロールや追加フィールドの構成が異なる。\n【過学習の監視: ホールドアウト検証ファイル】学習中の過学習を監視したい場合、ホールドアウトサンプルを含むJSONL形式の検証ファイルをファインチューニングジョブに提供する。Foundryポータルは学習損失(training loss)と並んで、設定可能なエポック間隔で検証損失(validation loss)を報告できるようになる——学習損失が下がる一方で検証損失が上昇/横ばいになった場合、モデルは過学習している。Azure AI SearchインデックスやFoundryポータルの評価フロー定義は、いずれも学習ループ自体の過学習監視には使われない(前者は推論時のRAG検索、後者は学習完了後のモデル出力比較)。\n【SFT vs DPO vs RLHF】教師ありファインチューニング(SFT)は入力/出力ペアで学習する。Direct Preference Optimization(DPO)は、好ましい応答と拒否された応答の“選好ペア”から、別途報酬モデルを用意せずに直接モデルを学習させる手法。Reinforcement Learning from Human Feedback(RLHF)も選好を扱うが、別途報酬モデルの学習が必要になる点でDPOと異なる——DPOは特にそのステップを省略するシンプルな代替。\n【インクリメンタル(増分)ファインチューニング】既存のファインチューニング済みモデルのチェックポイント上で、新しい学習データを使って継続学習する手法で、Azure OpenAIファインチューニングで明示的にサポートされている。ベースモデルからの全量再学習と異なり、最初の学習で得られたスタイルやドメイン知識を保持したまま、新サンプルだけを追加で学習できるため、580件全量での再学習よりも高速でコスト効率に優れる。LoRAアダプタによるマージはAzure OpenAIファインチューニングサービスではサポートされていない。システムプロンプトへのサンプル追加やプロンプトキャッシュは、新しいサンプルをモデルに学習させるものではなく(プロンプトキャッシュは繰り返されるプレフィックスのレイテンシを減らすだけ)、増分ファインチューニングの代替にはならない。\n【課金】ファインチューニングはトレーニングジョブ自体にトレーニング時間やトークン量に基づく課金が発生する。デプロイ後のホスティングと推論のみに課金が限定されるわけではない。\n【混同ポイント】『o1・埋め込みモデルは非対応』『データはJSONLのmessages配列』『選好ペア学習で報酬モデル不要→DPO』『選好ペア学習で報酬モデル必要→RLHF』『過学習の監視→ホールドアウト検証JSONLファイル(training lossとvalidation lossの乖離)』『新データで継続学習(スタイル保持)→インクリメンタルファインチューニング(LoRAマージは非対応)』。"
},
{
  term:"Foundry エージェント run のライフサイクル状態（queued/in_progress/requires_action/completed/failed）", cat:"エージェント",
  aliases:["requires_action","run状態","last_error","list_run_steps","AgentsClient","submit_tool_outputs_to_run","tool_call_id"],
  body:"Foundry Agent Serviceのrun(実行)はいくつかの状態を遷移し、それぞれ意味が異なる。\n【requires_action】モデルが関数ツールを呼び出すことを決定し、アプリケーションがツール結果を提供する必要がある状態。アプリが関数を実行して結果を返さない限り、runは先に進めない。code_interpreterやfile_searchのような組み込みツールはAgent Service内部で自動実行されrequires_actionは発生しないが、カスタム関数ツール(独自定義のfunctionツール)は常にこのrequires_actionパターンを必要とする——Agent Serviceがアプリケーションの関与なしにカスタム関数を自動実行することはない。また30秒などの固定タイムアウト後にモデルが自動的にリトライする仕組みも存在せず、実行はアプリケーションが応答するまでrequires_actionのまま留まる。\n【実行の再開: submit_tool_outputs_to_run】requires_action状態から実行を再開するには、`AgentsClient.submit_tool_outputs_to_run(thread_id, run_id, tool_outputs)`を呼び、run ID と tool_call_id+出力文字列を含むツール出力のリストを提供する。新しいrunを開始する`create_run()`や、スレッドにユーザーメッセージを追加するだけの`add_message()`、有効なツール出力送信手段ではない`update_run()`では、進行中のrunにツール出力を注入して再開させることはできない。\n【completed】正常に完了し、最終的なアシスタントメッセージがスレッドに追加されて応答が利用可能になった状態。関数呼び出しアクションを発行しただけの時点でcompletedに遷移するわけではない(その時点ではrequires_action)。\n【failed】実行が失敗した状態。last_errorに原因が記録され、再起動には開発者による手動介入とrunの再作成が必要。\n【観測性: list_run_steps】評価やデバッグのために完了したrunの詳細な記録を取得したい場合は `AgentsClient.list_run_steps(thread_id, run_id)` を使う。各ツール名・入力引数・ツール出力・モデルの思考をタイムスタンプ付きで記録する。似た名前の `get_run`(全体ステータスのみ)、`list_messages`(会話メッセージのみ)、`get_thread`(スレッドのメタデータのみ)では、この粒度の情報は得られない。\n【混同ポイント】『関数呼び出し待ち→requires_action(組み込みツールは自動実行、カスタム関数ツールは常にrequires_action)』『再開手段→submit_tool_outputs_to_run(tool_call_id+出力を提供)』『完了→completed』『失敗→failed(last_errorに原因)』『全ツールコールの詳細記録が欲しい→list_run_steps』。"
},
{
  term:"Foundry エージェントの組み込みツール一覧（bing_grounding / code_interpreter / file_search / openapi_v3 / 関数ツール）", cat:"エージェント",
  aliases:["bing_grounding","code_interpreter","file_search","openapi_v3","computer_use_preview","azure_ai_search","カスタム関数ツール","ベクトルストア","purpose=assistants"],
  body:"Foundryエージェントに構成できる組み込みツールは、それぞれ担当領域がはっきり分かれている。\n【bing_grounding】Bing Search APIによるWeb検索を提供し、最新の公開情報をインターネットから取得する。\n【code_interpreter】サンドボックス環境でPythonを実行し、データ分析などの出力を生成する。\n【file_search】アップロード済みファイルに対するセマンティック検索。ファイルは`purpose='assistants'`でアップロードし、ベクトルストアに追加したうえで、エージェントでfile_searchを有効化する必要がある。`purpose='vision'`は視覚分析用の画像ファイル向けで文書検索には使えず、ベクトルストアを介さずファイルIDを直接添付してもセマンティック検索は有効にならない。\n【openapi_v3】OpenAPI 3.0仕様で定義された外部REST APIを呼び出す。\n【カスタム関数ツール(function)】JSONスキーマとして定義され、エージェントが関数呼び出しアクションを発行し、アプリケーションコードが任意のターゲットエンドポイント(外部REST APIを含む)に対して実行する。openapi_v3と並んで外部REST呼び出しを実現する2つの手段。\n【azure_ai_search】Azure AI Searchインデックスからの検索(公開Webブラウジングではない)。\n【computer_use_preview】ブラウザとデスクトップ自動化。単純なWeb検索より広範囲な操作を伴う。\n【混同ポイント】『最新Web情報→bing_grounding』『Python実行→code_interpreter』『アップロード済み自社文書の検索→file_search(要ベクトルストア)』『外部REST API→openapi_v3 or カスタム関数ツール』『Azure AI Searchインデックス→azure_ai_search』。"
},
{
  term:"Magentic-One マルチエージェント アーキテクチャ（Orchestrator / WebSurfer / FileSurfer / Coder / ComputerTerminal）", cat:"エージェント",
  aliases:["Orchestrator","WebSurfer","FileSurfer","Coder","ComputerTerminal","タスク台帳","Magentic-One"],
  body:"Microsoft の Magentic-One は、役割分担された複数のサブエージェントをOrchestratorが束ねるマルチエージェント システム。\n【Orchestratorエージェント】タスクを分解し、特化型サブエージェントに指示を出す司令塔。進捗を追跡し、サブエージェントが失敗に遭遇したときに再計画を可能にする“タスク台帳”を維持する。\n【WebSurfer】ブラウザベースのWebリサーチとページナビゲーションを行う。\n【FileSurfer】ローカルファイルシステム上のファイルをナビゲートして読み取る。\n【Coder】サンドボックス環境でPythonなどのコードを実行する。\n【ComputerTerminal】システムレベルの操作のためにコマンドラインシェルコマンドを実行する。\n【混同ポイント】FileSurfer(ファイル読み取り)とComputerTerminal(シェルコマンド実行)、WebSurfer(Webリサーチ)とCoder(コード実行)を取り違えないこと。タスク台帳を持ち再計画するのはOrchestratorだけで、他のサブエージェントは特定領域の実行に特化している。"
},
{
  term:"Foundry の Connected Agent パターン（ConnectedAgentTool）", cat:"エージェント",
  aliases:["ConnectedAgentTool","Connected Agent"],
  body:"あるエージェントが別の特化型エージェントへサブタスクを委譲したいが、サブエージェントの内部実装は露出したくない場合に使うネイティブなパターン。\n【ConnectedAgentTool】プライマリエージェントに、サブエージェントのIDを指定してConnectedAgentToolを構成する。Agent Serviceがリクエストをルーティングし、サブエージェントのrunを実行して結果を返す——実装の詳細(サブエージェントがどう動いているか)は露出されない。\n【代替手段との比較】サブエージェントのRESTエンドポイントを指すopenapi_v3ツールを構成する方法は有効だが、サブエージェントのREST インターフェースを外部に露出することになる。両エージェントが順次投稿する共有スレッドを作る方法は、構造化された委譲パターンではなく明確なエージェント境界を作らない。Magentic-OneのOrchestratorを2エージェント間の仲介役に使う方法は、ネイティブなConnected Agentパターンで済む場面には過剰な複雑性を持ち込む。\n【混同ポイント】『内部実装を隠して委譲→ConnectedAgentTool』『REST露出/共有スレッド/Orchestrator仲介はいずれも代替として不適切または過剰』。"
},
{
  term:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", cat:"エージェント",
  aliases:["RoundRobinGroupChat","SelectorGroupChat","ProcessFramework","AssistantAgent","kernel_function","Semantic Kernel","sk_function","KernelFunction属性","Workflows","Sequential orchestration","AgentChatの終了条件","CodeExecutorAgent"],
  body:"Microsoft Agent FrameworkやSemantic Kernelでマルチエージェント/ツール呼び出しを実装する際の主要パターン。\n【RoundRobinGroupChat】固定ローテーションで次の発言者を選ぶ。会話の文脈には適応しない。\n【SelectorGroupChat】LLMを使って会話履歴に基づき次の発言者を動的に選択する。コーディネーター役が現在のタスク文脈に適応できるようにしたい場合に使う。\n【Process Frameworkのステートマシン】ステートマシンで定義される逐次ビジネスプロセスワークフロー向け。動的な発言者選択の仕組みではない。\n【Workflows の Sequential orchestration】Microsoft Agent Frameworkの Workflows は複数エージェントの実行経路を明示的に制御する仕組みで、その Sequential orchestration は各エージェントが前段の出力を受け取り、固定された順序で逐次実行される構成をモデル化する。Author→Reviewer→Approverのような、各段階が決定的に次段へ出力を渡す厳密な逐次パイプラインに最適——RoundRobinGroupChatは固定順で発話を交代するが段階間のデータ受け渡しや明示的な遷移を構造的にモデル化せず、SelectorGroupChatはLLMによる動的選択のぶん固定パイプラインには不要なオーバーヘッドとなる。\n【単一AssistantAgent/AutoGen単一エージェント】コーディネーター用システムプロンプトを持たせても、それは単一エージェントパターンであり、グループオーケストレーション機構そのものではなく、複数役割へのエージェント特化も得られない。\n【AgentChatの終了条件】トークン上限・収束フレーズ・最大ターン数などでマルチエージェント会話を終了させるための構成。\n【CodeExecutorAgent】Pythonコードをサブプロセスで実行するエージェントタイプ。\n【Semantic Kernelの@kernel_function】Pythonプラグインのメソッドに`@kernel_function`デコレータ(`semantic_kernel.functions`からインポート、C#では`[KernelFunction]`属性)を付与すると、そのメソッドが関数としてマークされる。この装飾はメソッドシグネチャ・docstring・パラメータ注釈を自動的にJSONツールスキーマへ変換しLLMに登録する仕組みで、`KernelArguments`(オーケストレーション全体で受け渡されるデータ構造)や`ChatHistory`(会話メッセージの保持)、Foundryモデルカタログへの公開(モデルデプロイ操作)はいずれもツール登録の仕組みではない。プラグインをカーネルへ追加し、関数呼び出しを有効化した実行設定(`FunctionChoiceBehavior.Auto()`など)でモデルを呼び出すと、ツールのJSONスキーマへ自動変換されてLLMに公開される。旧バージョンの`@sk_function`は現在のPython SDKでは使わない。\n【混同ポイント】『固定ローテーション→RoundRobin』『会話文脈に応じ動的選択→Selector』『ステートマシン型の逐次ワークフロー→ProcessFramework』『厳密な順序で前段出力を次段へ渡す逐次パイプライン→WorkflowsのSequential orchestration』『単一エージェント→オーケストレーション機構ではない』『Semantic Kernelのツール化デコレータ→@kernel_function/[KernelFunction](@sk_functionは旧式、KernelArguments/ChatHistoryはツール登録の仕組みではない)』。"
},
{
  term:"セマンティック キャッシングと PTU スピルオーバー（コスト最適化）", cat:"生成AI",
  aliases:["セマンティックキャッシング","Azure API Management","スピルオーバー","spillover","PTU利用率100%超過","モデルルーティング","損益分岐点","60-70%利用率"],
  body:"Azure OpenAIのコストとスループットを最適化する複数の独立した仕組み。\n【セマンティックキャッシング】Azure API Managementのセマンティックキャッシング機能は、ベクトル類似度を使ってセマンティックに類似する(言い換えられた)クエリをキャッシュ済み応答にルーティングし、LLMコールとコストを削減する。完全一致キーのみのAzure Cache for Redisや、HTTP応答をエッジでキャッシュするAzure Front Doorのレスポンスキャッシュルールでは、言い換えクエリのセマンティックマッチには対応できない。prompt flowのバッチrunキャッシングは分析用の記録であり、本番推論のアクティブなキャッシング層ではない。\n【モデルルーティング】シンプルな分類クエリをGPT-4o miniのような低コストモデルへ、複雑な推論を要するクエリをGPT-4oのような上位モデルへ振り分けることで、呼び出しあたりのコストを下げる手法。max_tokensパラメータを増やすのは出力トークンが増えて呼び出しあたりコストがむしろ上昇するため逆効果、コンテンツフィルターの無効化はセキュリティリスクでありコスト削減策としても不適切。\n【PTUスピルオーバー】PTU(プロビジョニング済みスループット ユニット)デプロイの利用率が100%を超えた際に、超過トラフィックを従量課金デプロイへルーティングする構成。リクエスト失敗を防ぎつつベースロードでは予測可能なコストを維持する。別リージョンへの2つ目のPTUデプロイ+ジオルーティングはリージョン跨ぎのルーティングロジックが別途必要で直接の解決にならず、PTU予約サイズの単純な増量は大半の期間で過剰プロビジョニングとなり、マネージドオンラインエンドポイントの自動スケーリングはPTU容量(予約割り当て)を動的に増やす仕組みではない。\n【PTU vs 従量課金の損益分岐点】PTUと従量課金(pay-per-token)のコスト効率が逆転する損益分岐点は、モデルやリージョンに応じておよそ60-70%の利用率とされる。平均利用率がこれを下回る場合(例: 平均55%)は、ピーク時に85%へ達するとしても、PTUの時間単価をフルで支払いながら容量を使い切れていないため従量課金の方が安価になりやすい——ピーク利用率の高さは「スロットリング回避のためPTUが必須」という結論には直結せず、ピークは従量課金へのスピルオーバー構成で対応できる。PTUは利用率に関係なく常に従量課金より安いわけではない。\n【混同ポイント】『言い換えクエリもキャッシュヒットさせたい→APIMのセマンティックキャッシング』『クエリの難易度でモデルを使い分けコスト削減→モデルルーティング』『PTU上限超過トラフィックを失敗させたくない→スピルオーバー構成』『PTUが得か従量課金が得か→損益分岐点(概ね60-70%利用率)との比較で判断』。"
}
]);

/* ===== 追加バッチ: Vision 4.0 カスタムモデル・非同期ポーリング・Speech・CLU実体・ベクトル量子化・引用生成（Udemy教材由来 第3弾） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Image Analysis 4.0 のカスタム モデル学習（COCO 形式 JSON / Model Customization API / modelName）と Custom Vision との違い", cat:"ビジョン",
  aliases:["Model Customization API","COCO形式","modelName","カスタム画像分類モデル","カスタム物体検出モデル（Image Analysis）","/imageanalysis/models:train","precision・recall・mAP評価"],
  body:"Image Analysis 4.0 には、旧来の Custom Vision サービスとは別の“新しい”カスタムモデル学習の仕組みがある。\n【学習データ形式】Azure Blob Storage に保存された COCO 形式の JSON データセットが必須。マニフェストには SAS トークン付き Blob URL としての画像 URI と、バウンディングボックスのアノテーションがリストされる。Pascal VOC XML・LabelMe JSON・簡略化されたCSV(image_url, class_label, x, y, width, height等)はいずれもサポートされない。\n【学習方法】別個の Custom Vision サービス リソースは不要——カスタムモデルは Azure AI Vision リソース内で、Model Customization API または Foundry Tools の UI を介して学習される(店舗棚画像から自社製品SKUを認識するような物体検出、画像分類のいずれも対象)。\n【正しい学習ワークフローの順序】① Azure Blob Storageに境界ボックス付きCOCO形式データセットを作成(先にデータセットが存在しないと学習ジョブが参照できない) → ② データセットURLと学習構成で`/imageanalysis/models:train`にPOSTしてポーリング → ③ 学習結果からprecision・recall・mAPを評価する(評価前のデプロイは不正確なモデルを本番投入する恐れがあるため、デプロイより必ず前に行う) → ④ 検証済みの学習済みモデルをデプロイし`analyze(model_name=...)`で推論する。\n【推論】学習後のカスタムモデルは、専用の別APIではなく“同じ” Analyze Image API を使い、modelName パラメータでカスタムモデル名を指定して呼び出す。\n【インクリメンタルトレーニングは不可】既存モデルへのクラス追加(インクリメンタルトレーニング)は直接サポートされておらず、クラスを追加したい場合は結合した全データセットで再学習する必要がある。\n【旧 Custom Vision との違い】旧来の Custom Vision は Training/Prediction という別個のリソースに分かれ、Compact ドメインでのみエクスポート可能という設計だった。Image Analysis 4.0 のカスタムモデルはこれとは別の仕組みで、単一の Azure AI Vision リソース内で完結する。\n【混同ポイント】『別個の Custom Vision リソースが必要』は誤り(Azure AI Vision リソース内で完結)。『トレーニングデータは Pascal VOC XML』も誤り(COCO形式のJSON)。『クラス追加は直接サポート』も誤り(全データセットでの再学習が必要)。"
},
{
  term:"非同期 REST API のポーリング パターン（operation-location ヘッダー）", cat:"ナレッジ",
  aliases:["operation-location","status_url","Location ヘッダー","非同期分析フロー"],
  body:"Azure Document Intelligence の :analyze エンドポイントや、Read API の非同期パスなど、時間のかかる解析処理は共通の“開始→ポーリング→取得”パターンに従う。\n【正しい手順】① モデルの :analyze(または analyze) エンドポイントに文書/画像付きで POST して解析を開始する。② レスポンスの HTTP ヘッダーに含まれる operation-location の値を読み取る——これがポーリング先のURLで、JSONレスポンスボディの中に含まれる'status_url'のようなフィールドではない。③ その operation-location のURLを 'succeeded' になるまでポーリングする。④ 完了後に AnalyzeResult などの JSON をパースして、ページ・テーブル・フィールドといった結果を抽出する。\n【誤りやすいポイント】ポーリングURLをレスポンスボディから探そうとする、あるいは元のエンドポイントURLとジョブIDを組み合わせて自前でURLを構築しようとするのはいずれも誤り——ポーリング先は必ずoperation-locationヘッダーから得る。標準的なHTTPリダイレクトで使われる'Location'ヘッダーとも異なる、この種のAPI専用のヘッダー名である点に注意。また、成功(succeeded)を確認する前に結果をパースすることはできず、手順の前後を入れ替えることもできない。\n【混同ポイント】『ポーリング先URLの出どころ→レスポンスボディではなくoperation-locationヘッダー』『手順の順序→POST→ヘッダー読み取り→ポーリング→パースの一方向』。"
},
{
  term:"GPT-4o Realtime API（WebSocket音声入出力）と従来のSTT→LLM→TTSパイプライン", cat:"生成AI",
  aliases:["Realtime API","WebSocket音声","GPT-4o Realtime","エンドツーエンドレイテンシ"],
  body:"音声対話アプリのレイテンシを比較する際の2つのアーキテクチャ。\n【従来の逐次パイプライン(STT→LLM→TTS)】SpeechRecognizer→chat completionsコール→SpeechSynthesizerと、3つの逐次API コールを経由する標準的な構成。各段階のレイテンシが累積的に加算されるため、エンドツーエンドの遅延が大きくなりやすい。\n【GPT-4o Realtime API】WebSocket接続上の統合ストリームとして音声入力を処理し音声出力を生成する——音声認識・LLM推論・音声合成を個別のAPIコールに分けず、1つの統合的な音声入出力として扱うため、エンドツーエンドのレイテンシを1秒未満に短縮できる。対話型の音声アシスタントでレイテンシを最小化したい要件に最適。\n【向かないアプローチ】録音音声のバッチ文字起こし→LLM完了→TTSという構成はオフラインのバッチ処理向けであり、リアルタイム性は求められない。Azure Bot ServiceとSpeech SDKのDirectLineチャネルを組み合わせる統合パターンは、レイテンシを削減するどころか追加のレイテンシをもたらす。\n【混同ポイント】『個別API呼び出しの累積レイテンシを避けたい→GPT-4o Realtime APIのWebSocket統合ストリーム』。"
},
{
  term:"Custom Speech の学習データ手法（プレーンテキスト適応/音響適応/発音データ）", cat:"自然言語",
  aliases:["プレーンテキスト適応","言語モデル適応","音響モデル適応","Universal Phone Set","発音データ","8kHz/16kHz WAV","ラベル付き文字起こし不足"],
  body:"ベースのSpeechモデルが専門用語(略語・固有名詞など)を誤認識する場合、Custom Speechでの改善アプローチはコストと目的で使い分ける。\n【プレーンテキスト適応(言語モデルの適応)】ドメイン固有用語を含むプレーンテキストの文を提供して言語モデルを適応させる。必要なデータが最も少なく最もコスト効率が良い、専門用語認識改善の基本手段。\n【音響モデルの適応】大量の音声データ(例: 100時間分)と人手ラベル付き文字起こしを集めて音響モデルを適応させる手法。主に音響的な不一致(アクセント・雑音環境など)への対応が目的で、用語認識の改善が主目的ではなく、データ収集コストが最も高い。\n【発音データ(Universal Phone Set形式)】各略語・専門用語の発音エントリを追加する手法。非標準な発音の略語に有用だが、用語認識全体を改善する“最もコスト効率の良い単一のアプローチ”を問われた場合の第一選択ではない。\n【対訳コーパスでの全体再学習】大規模な対訳コーパスでベースモデルを再学習するのは、Custom Speechの通常のカスタマイズ ワークフロー(適応)とは整合しない大規模な作業であり、通常は不要。\n【音声フォーマットの対応範囲】Custom Speechは8kHzまたは16kHz、16ビットPCM、monoのWAV音声を学習データとして受け付ける——電話音声(8kHz)もコールセンターの代表シナリオとして明示的にサポートされ、サンプルレート自体はブロッカーにならない。\n【文字起こしがないと何が制限されるか】専門用語の認識精度を高めるには、音声に対応する人によるラベル付き文字起こし(またはプレーンテキストなどの関連テキスト)が本質的に必要——音声ファイルのみで文字起こしがない場合、専門用語を学習させる語彙シグナルが不足し、改善が限定的になる(音声のみでの学習は一部ロケール限定のプレビューにとどまる)。背景ノイズは対処可能でむしろ本番条件との一致に寄与し、通話録音の時間の短さも学習データの利用を妨げる主要因ではない。\n【混同ポイント】『専門用語の認識改善を最少データ・最小コストで→プレーンテキスト適応』『音響的な不一致(アクセント/雑音)への対応→音響モデル適応(データ収集コスト大)』『非標準発音の個別対応→発音データ』。"
},
{
  term:"CLU のエンティティ種別（学習型/事前構築済み/リスト/正規表現）", cat:"自然言語",
  aliases:["学習型実体","Learned entities","事前構築済み実体","Prebuilt entities","リスト実体","List entities","正規表現実体","Regex entities"],
  body:"Azure AI Language の CLU(旧LUISの後継)では、抽出したい実体(エンティティ)の性質によって4種類の実体型を使い分ける。\n【学習型実体(Learned entities)】文脈からニューラルモデルが抽出する実体。事前定義された値リストは不要で、言い回しの揺れに強い。\n【事前構築済み実体(Prebuilt entities)】DateTime や Number など、一般的な型に対する標準認識器を使う。開発者定義のカスタムリストは扱わない。\n【リスト実体(List entities)】開発者が定義した値のリストから完全一致のルックアップを行う。例えば製品名や都市名など、決まった語彙の集合と完全一致させたい場合に使う。\n【正規表現実体(Regex entities)】値リストではなく、パターンベースの正規表現でマッチさせる。\n【混同ポイント】『開発者定義の値リストと完全一致→List entities』『文脈からモデルが学習抽出→Learned entities』『DateTimeなど汎用型の標準認識→Prebuilt entities』『パターンマッチ→Regex entities』。LUISからの移行時に，この4分類の対応関係を問われやすい。"
},
{
  term:"Analyze Text 統合エンドポイントの制限とマルチタスク バッチ", cat:"自然言語",
  aliases:["Analyze Text エンドポイント","マルチタスクバッチリクエスト","文書数上限","文字数上限"],
  body:"Azure AI Language の統一された Analyze Text エンドポイントの挙動と制限。\n【マルチタスクバッチ】センチメント分析・NER・キーフレーズ抽出などの複数タスクを、1つのバッチリクエストにまとめて送信できる——1コールあたり1種類のタスクに制限されているわけではない。文書を送信前に文単位へ分割する必要もなく、文への分割はサービス側が内部で行う。\n【文書数・文字数の上限】センチメント分析やキーフレーズ抽出のリクエストあたりの文書数は10、NERは5が上限。同期リクエストでは1文書あたり5,120文字が上限だが、非同期では最大125,000文字まで扱える。また25文書という値は非同期処理時の集約上限であり、「25文書×各5,120文字」のように2つの上限を掛け合わせたような制限は実在しない。\n【センチメント分析のレスポンス粒度】文書全体に対するセンチメントラベル・信頼度スコアに加えて、文書内の“各文”に対してもセンチメントラベルとスコアを返す——文書レベルのスコアのみではなく、文単位のセンチメントスコアも含まれる。\n【混同ポイント】『1コールで複数タスク→対応している(1タスク限定ではない)』『文分割は自動→開発者側での事前分割は不要』『文書数上限は同期/非同期・タスクの種類で異なり、25文書×5,120文字という組み合わせの制限は存在しない』『センチメントは文書レベルと文レベルの両方が返る』。"
},
{
  term:"ベクトル量子化（スカラー=int8 と バイナリ）とストレージ最適化", cat:"ナレッジ",
  aliases:["スカラー量子化","バイナリ量子化","int8","オーバーサンプリング","stored:false","efSearch","HNSWパラメータ"],
  body:"Azure AI Search でベクトルインデックスのメモリ使用量を削減する手法は、圧縮率と精度損失のトレードオフが異なる。\n【スカラー量子化】各 float32 次元を int8 値にマップし、4倍の圧縮を提供する。オーバーサンプリングを併用することで、量子化による小さな精度損失を補う。1536次元の埋め込みをint8値に圧縮しつつ精度損失を最小化したい、という要件に合致する。\n【バイナリ量子化】各次元を1ビットに割り当て、32倍という、より積極的な圧縮を提供する。int8への4倍圧縮より圧縮率が高いぶん精度への影響も大きく、非常に高次元の埋め込みに向く——int8形式への圧縮を求める要件には合わない。\n【HNSWパラメータの削減(m/efSearch)】m や efSearch を下げるとHNSWグラフの探索精度(ひいては検索精度)が下がるが、ベクトルの格納形式そのものをint8などに圧縮するわけではない。\n【stored:falseの設定】ベクトルフィールドを保存しないことでストレージを削減できるが、ベクトル値自体の取得ができなくなるだけであり、値を保持したまま圧縮する手法ではない。\n【混同ポイント】『int8への4倍圧縮で精度損失を抑えたい→スカラー量子化(+オーバーサンプリング)』『さらに積極的な32倍圧縮→バイナリ量子化』『HNSWパラメータ調整やstored:falseは圧縮そのものではない』。"
},
{
  term:"Index Projections（親子チャンク分割）による正確な引用生成", cat:"ナレッジ",
  aliases:["index projections","親子チャンク","正確な引用生成","子チャンク","親文書メタデータ"],
  body:"RAGパイプラインでチャンク化を行う際、Azure AI Searchのindex projectionsは“親子関係”を使って正確な引用を可能にする。これは object/table/fileの3種類からなる“ナレッジ ストアのプロジェクション”とは別の、インデックス側のチャンク分割の仕組みである点に注意。\n【各チャンクが個別のインデックスドキュメントとして保存される】フラットな単一ドキュメントインデックスでは実現できない動作として、各チャンクが親ドキュメントとリンクされた“個別の”インデックスドキュメントとして保存される——ドキュメント全体ではなく最も関連性の高いチャンクをピンポイントで検索できる。\n【親文書メタデータの取得】マッチした子チャンクと並んで、タイトル・URLなどの親文書メタデータを取得できる——正確な引用に必要な情報が得られる。\n【自動再埋め込みではない】埋め込みモデルが更新された際に、インデクサーがすべてのチャンクを自動的に再埋め込みすることはない——再埋め込みにはインデクサーの再実行が必要。\n【BM25スコアはチャンクごとに異なる】同じ親ドキュメント由来のチャンクでも、BM25は各チャンク(ドキュメント)を個別にその用語頻度に基づいてスコアリングするため、同一のBM25スコアを受け取るわけではない。ベクトル次元の上限(例:チャンクあたり3,072次元超をサポートするか)はインデックスプロジェクションとは無関係の別の制約。\n【ソース文書へのリンク】各チャンクをそのソース(親)文書にリンクすることで、RAGアプリケーションでの正確な引用生成を特にサポートする。\n【index projectionsが“行わない”こと】LLMに渡す前に子チャンクを自動的にマージして元の完全な文書に戻す、という動作は組み込みでは行われない(必要ならアプリケーション層で設計する)。テキストを子レベルにのみ格納し親レベルの埋め込みでベクトル検索を可能にする、という特定のスキーマ選択は親子関係そのものの機能ではない。子ベクトルをバイナリ量子化で自動的に圧縮する、という機能とも無関係(量子化は独立したベクトルフィールドの構成)。\n【混同ポイント】『チャンクからソース文書への参照を保持し正確な引用を可能にする→index projectionsの親子関係』『自動マージ/特定スキーマ選択/自動量子化はいずれも親子関係そのものの機能ではない』。「ナレッジ ストアの3プロジェクション(object/table/file)」とは異なる概念である点に注意。"
}
]);

/* ===== 追加バッチ: エンドポイント運用・セキュリティ ハードニング・評価テスト手法（Udemy教材由来 第4弾） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"マネージド オンライン エンドポイントのトラフィック割り振り（ブルー/グリーンデプロイ・A/Bテスト）", cat:"計画・基盤",
  aliases:["トラフィック割り振り","ブルーグリーンデプロイ","A/Bテスト（Foundryエンドポイント）"],
  body:"モデルの新バージョンを段階的に本番投入したい場合の仕組み。\n【トラフィック割り振り】Foundryのマネージド オンライン エンドポイントは、単一のエンドポイントの下に複数のデプロイ(例: 安定版と新バージョン)を同時に置き、それぞれにトラフィック割り振り(パーセンテージ)を構成できる。例えば安定版90%・新バージョン10%のように分割し、一定期間メトリクスを検証した後、問題がなければ新バージョンを100%に昇格させる——クライアント側のURLを変更せずにブルー/グリーンデプロイやA/Bテストが行える。\n【代替にならない選択肢】バッチエンドポイントのジョブスケジューリングは非同期の一括ファイル処理向けでライブトラフィック分割は扱わない。サーバーレスAPIデプロイ(モデルカタログのモデル向け)はトラフィック分割の構成を公開していない。Azure API Managementでもルーティングは可能だが、Foundryネイティブのエンドポイント機能で要件を満たせるため、わざわざ持ち込むと不要な複雑性が増える。\n【混同ポイント】『段階的な新バージョン投入(例:10%→検証→100%)→エンドポイント配下の複数デプロイ間のトラフィック割り振り』。"
},
{
  term:"Foundry ハブのセキュリティ ハードニング推奨事項（マネージドID/Defender for Cloud/Azure Policy）", cat:"計画・基盤",
  aliases:["セキュリティ ハードニング","Microsoft Defender for Cloud","Azure Policy（プライベートエンドポイント強制）"],
  body:"規制対象ワークロード向けにFoundryハブをハードニングする際の代表的な推奨行動。\n【マネージドID認証の徹底】ハブにアクセスするすべてのアプリケーションコードでマネージドID認証を使用し、API キーの使用を避ける。資格情報をコードや構成ファイルに埋め込む必要がなくなり、キー漏えいのリスクを排除できる——API キーを構成ファイルに保存するのは明確なアンチパターン。\n【Microsoft Defender for Cloud】ハブを含むサブスクリプションで有効化し、脅威検出を行う。\n【Azure Policyによるプライベートエンドポイント強制】すべての新規Foundryリソースに対してプライベートエンドポイントの利用を強制するAzure Policyを適用し、ネットワーク分離を組織全体で一貫して確保する。\n【過剰権限は避ける】「最大限の柔軟性のため」といった理由でハブのマネージドIDにKey Vault Administratorのような広範なロールを割り当てるのは、Key Vaultへのアクセス権限を過剰に付与することになり避けるべき。\n【混同ポイント】『資格情報→マネージドID(APIキー埋め込みは不可)』『脅威検出→Defender for Cloud』『新規リソースへの一貫した分離強制→Azure Policy』『柔軟性を理由にした過剰なロール付与は避ける』。"
},
{
  term:"マネージド オンライン エンドポイントのコールドスタート（init()での初期化 vs 遅延初期化）", cat:"計画・基盤",
  aliases:["コールドスタート","init()","遅延初期化","スコアリングコード"],
  body:"新しいデプロイのインスタンスへの最初の数リクエストだけが極端に遅い、という症状の典型的な原因。\n【正しい設計】モデルのロードのような重い初期化処理は、スコアリングコードの init() の中で(インスタンスがトラフィックを受け取る前に)実行しておくのが基本。\n【アンチパターンとその症状】初期化処理を init() ではなく最初のリクエスト処理時まで遅延させてしまうと、その初期化コスト(数十秒かかることもある)が“ウォームアップ前の最初の応答”にそのまま現れる——モデル自体の推論は高速(例: 500ミリ秒未満)でも、初回だけ極端に遅くなる。\n【紛らわしい別の原因との違い】自動スケールルールの構成はインスタンス“数”の増減を制御するものであり、初回リクエストの初期化遅延そのものを解消しない。429エラーを伴うレート制限(クォータ超過)は成功応答の遅延としては現れない別の症状。カスタムDockerイメージが別リージョンに保存されている場合はデプロイ/スケールアウト時のイメージプルが遅くなるが、稼働後の個々のリクエスト応答が遅くなる原因にはならない。\n【混同ポイント】『モデル自体は高速なのに最初の数リクエストだけ極端に遅い→スコアリングコードの遅延初期化(init()に載せるべき処理が最初のリクエストに紛れ込んでいる)』。"
},
{
  term:"prompt flow のテスト手法（Playground 単一行 vs バッチラン vs 評価フロー vs デプロイのトラフィック ロギング）", cat:"生成AI",
  aliases:["Playground単一行テスト","バッチラン","評価フロー（CIゲート）","トラフィックロギング","azure.ai.evaluation evaluate()","pfazure","CI/CD統合（prompt flow評価）"],
  body:"prompt flowの品質検証には目的の異なる4つの手法がある。\n【Playgroundでの単一行テスト】一度に1件の入力を処理する簡易テスト。大規模なデータセット全体の検証には向かない。\n【バッチラン】データセット全体に対してフローを実行し、各行ごとに入力・出力・中間ノードの値(各LLM応答を含む)を記録する。500行のデータセットについて、すべての入力/出力/中間LLM応答を行ごとに確認したい、という要件に直接対応する。\n【評価フロー(CIゲートとして送信)】バッチランの出力に対して品質メトリクスを計算する“二次的な”ステップであり、行ごとの入出力を記録する仕組みそのものではない——バッチランの存在を前提とする。\n【デプロイのトラフィックロギング】デプロイ済みエンドポイントが受ける“本番リクエスト”をキャプチャする仕組みであり、デプロイ前のデータセットテストの手段ではない。\n【CI/CDパイプラインへの評価組み込み】モデル品質が低下した際にプルリクエストをブロックしたい場合、Foundryは`azure.ai.evaluation` Python SDKの`evaluate()`(パイプライン内で評価をプログラマティックに実行し結果メトリクスを返す)と、prompt flow CLI(`pfazure`、ローカルフローの評価実行をクラウドへサブミットする)の2つをサポートする。パイプライン側では返された評価メトリクス(例: groundednessスコアが3.5を下回れば失敗)をしきい値と比較してゲートを実装する。Azure DevOps Boards(プロジェクト管理ツール)、prompt flowコネクタ付きAzure Logic Apps(サポートされた評価インターフェースではない)、Azure OpenAIファインチューニングAPIの直接呼び出し(モデル学習であり評価実行ではない)はいずれも代替にならない。\n【混同ポイント】『デプロイ前に大量データセットの入出力・中間応答を行ごとに検証したい→バッチラン』『バッチラン結果への品質スコア算出→評価フロー』『1件だけ試す→Playground単一行テスト』『本番トラフィックの記録→トラフィックロギング』。"
}
]);

/* ===== 追加バッチ: RAGチャンク分割・エージェント監視テレメトリ（Udemy教材由来 第5弾） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"Add Your Data のチャンク分割パラメーター（chunk_size / chunk_overlap）", cat:"生成AI",
  aliases:["chunk_size","chunk_overlap","Add Your Data","top-k検索件数","scoringProfile（BM25重み付け）"],
  body:"FoundryのAdd Your Data機能は、埋め込み・インデックス作成の“前”にソース文書へチャンク分割を適用し、いくつかのパラメーターで分割方法を構成できる。\n【chunk_size】各チャンクの最大文字数またはトークン長を制御する。小さくするとより焦点を絞った狭いチャンクが生成される。\n【chunk_overlap】隣接するチャンク間で共有される文字数/トークン数を制御する。境界部分のテキストの一部を繰り返すことで、チャンク間の連続性を確保する。\n【チャンク分割パラメーターではないもの】検索のk(top-k検索件数)は1クエリあたりに返されるチャンク数を決定するもので検索を制御するものでありチャンク分割ではない。scoringProfileはBM25の関連度の重み付けを調整するもので文書分割は行わない。埋め込みモデルの次元数はモデルの選択によって決まる固定値であり、チャンク分割パラメーターではない。\n【混同ポイント】『チャンクの最大長→chunk_size』『チャンク間の重複→chunk_overlap』『検索時に返す件数→k(チャンク分割ではなく検索パラメータ)』『BM25の重み付け→scoringProfile(チャンク分割ではない)』。"
},
{
  term:"Foundry エージェントの Application Insights テレメトリ アラート指標（ツールエラー率/完了タスクあたりトークン消費量）", cat:"エージェント",
  aliases:["ツールエラー率","完了タスクあたりトークン消費量","エージェントテレメトリ","コンテンツフィルター発動率"],
  body:"Foundry Agentの評価・監視ドキュメントが、エージェント実行のアラートルールに使えるApplication Insightsメトリックとして明示的に挙げているもの。\n【ツールエラー率】失敗したツール呼び出しが総呼び出し数に対して占める割合。サービス劣化の検知に使う。\n【完了タスクあたりのトークン消費量】ローリング平均を急激に上回る場合、異常な振る舞い(無駄なループやプロンプト肥大化など)の兆候として使える。\n【エージェントテレメトリの次元ではないもの】コンテンツフィルター発動率(安全フィルターでブロックされた応答の割合)は診断設定で利用可能なContent Safetyメトリックであり、エージェント実行テレメトリのアラート条件とは別に列挙されている。エージェントの課金額は Azure Cost Management に属し、同時Blob Storageトランザクション数はAzure Storageのメトリックであり、いずれもエージェントテレメトリの次元ではない。\n【混同ポイント】『サービス劣化→ツールエラー率』『異常な振る舞い→完了タスクあたりトークン消費量』『コンテンツフィルター発動率/課金額/Blob Storageトランザクション数はいずれもエージェント実行テレメトリのアラート条件としては別分類』。"
}
]);

/* ===== 追加バッチ: ベクトル検索チューニング・画像生成モデル移行・音声認識評価（Udemy教材由来 第6弾） ===== */
window.AI103_GLOSSARY = window.AI103_GLOSSARY.concat([
{
  term:"HNSWのチューニングパラメータ（m / efConstruction / efSearch / metric）", cat:"ナレッジ",
  aliases:["efSearch","efConstruction","m（接続性パラメータ）","metricパラメータ","動的候補リスト"],
  body:"Azure AI SearchのHNSWベクトルインデックスは、構築時とクエリ時で別々にチューニングできるパラメータを持つ。\n【m(接続性パラメータ)】構築時にノードあたりに作成される双方向リンク数を制御する。グラフ構築時の接続性(構築時間とグラフ品質)に影響するが、クエリ時精度を直接決めるものではない。\n【efConstruction】インデックス構築時の動的候補リストのサイズを制御する。これもクエリ時のものではなく構築時のパラメータ。\n【efSearch】クエリ実行時の動的候補リストのサイズを制御する。値を増やすと各検索ステップでより多くの候補ノードを探索するため、検索レイテンシが上がる代わりに再現率(クエリ時精度)が向上する——クエリ時の精度を最重要視し、レイテンシ増加を許容できるならこのパラメータを増やす。\n【metricパラメータ】cosine/euclidean/dotProductなど距離関数を定義するもので、値を変更しても同一メトリック空間内の精度をチューニングすることにはならない。\n【混同ポイント】『構築時のグラフ品質→m』『構築時の候補リストサイズ→efConstruction』『クエリ時の精度とレイテンシのトレードオフ→efSearch』『距離関数の定義→metric(精度チューニングのノブではない)』。"
},
{
  term:"DALL-E 3 の退役と gpt-image シリーズへの移行（base64レスポンスと永続化）", cat:"生成AI",
  aliases:["DALL-E 3 退役","gpt-image-1","response_format","base64画像データ","画像の永続化"],
  body:"Azure OpenAIの画像生成モデルの世代交代と、生成画像の扱い方。\n【DALL-E 3の退役】DALL-E 3の画像生成モデルは2026年3月4日に退役し、新規デプロイでは利用できず、既存デプロイも非機能となった。リージョンの変更、APIバージョンの更新、コンテンツフィルターの無効化のいずれを行っても、退役済みのモデル自体は復旧しない——退役はモデル提供そのものの終了であり、設定変更で覆せない。\n【後継: gpt-imageシリーズ】画像生成を継続するには gpt-image-1 などgpt-imageシリーズのモデルへ新たにデプロイして移行する必要がある。\n【gpt-image-1のレスポンス形式】response_formatパラメーターをサポートせず、常にbase64エンコードされた画像データを応答本文に返す(url形式は選択できない)。\n【画像の永続化】生成画像をデータベース等で長期保持したい場合は、base64データをデコードしてAzure Blob Storageなどの耐久性のあるストレージに保存し、データベースからは保存先を参照する。画像保持期間(expiry)を指定するパラメーターは存在せず、nパラメータ(生成する画像枚数)を増やしても保持期間が延びるわけではなく、応答にURLを返さないためAzure CDNへの登録によるキャッシュも成立しない。\n【混同ポイント】『退役したモデルはリージョン/APIバージョン/コンテンツフィルター設定では復旧しない』『gpt-image-1は常にbase64を返す(url不可)』『長期保持→Blob Storage等へのデコード後の保存、expiryパラメータやn増加では保持されない』。"
},
{
  term:"単語誤り率（WER）の評価と改善判断", cat:"自然言語",
  aliases:["Word Error Rate","WER","単語誤り率","相対改善率"],
  body:"Custom Speechモデルの認識精度をベースラインと比較する際の指標。\n【WERの定義】単語誤り率(Word Error Rate)は値が低いほど認識精度が良いことを示す指標。ベースラインのWER18%からカスタムモデルのWER14%への変化は、絶対値で4ポイントの削減、相対では約22%の改善(4/18≒0.222)を意味し、これは測定可能な向上を示す——WERの数値が下がった場合を「悪化」や「上昇」と読み違えないこと。\n【文書化された絶対しきい値は存在しない】「有用と見なされるには絶対WERが5%未満まで下がる必要がある」といった文書化された合格基準は存在しない。有用な改善はドメイン依存であり、ベースラインとの比較(絶対/相対の削減幅)で判断する。\n【改善があってもデプロイの準備完了を意味しない】WERに測定可能な改善があっても、それだけで自動的に本番運用可能と判断することはできない——代表的な実トラフィック、エッジケース、組織のデプロイ受け入れ基準に対する追加の検証が必要。\n【混同ポイント】『WERは低いほど良い(高くなった=悪化ではなく、下がった数値=改善)』『絶対5%のような文書化されたしきい値は存在しない』『改善=即デプロイ可ではなく追加検証が必要』。"
}
]);
