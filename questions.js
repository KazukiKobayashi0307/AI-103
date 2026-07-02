/* ===========================================================================
 *  Azure AI-103 模擬問題集  (questions data — part 1: q001-q030)
 * ---------------------------------------------------------------------------
 *  スキーマ: {id,domain,type,source?,q,choices:[{t,c,e}],summary,keywords:[{k,d}]}
 *  ※ 選択肢は出題時シャッフル→解説は記号参照せず個別 e に正誤理由を書く。
 *  ※ 誤答 e は「本来そのサービス/機能は何か（本来の意味）」＋
 *    「このケースでなぜ不適か（当該ケースの問題）」を明記する（深い解説基準）。
 *  ※ source 省略時は "AI-102" とみなす。
 * =========================================================================== */
window.AI103_QUESTIONS = [

/* ===== 1. Azure AI ソリューションの計画と管理 (plan) ===================== */

{
  id:"q001", domain:"plan", type:"single",
  q:"単一のキーとエンドポイントで Azure OpenAI・Vision・Language・Speech をまとめて呼び出せるリソースを 1 つだけ作成したい。Azure CLI の `az cognitiveservices account create` で指定すべき `--kind` はどれか。",
  choices:[
    { t:"AIServices", c:true,  e:"統合された「Azure AI services（Microsoft Foundry）」マルチサービス リソースの kind。Azure OpenAI を含む複数の AI サービスを 1 つのリソース／エンドポイント／キーで利用できる、現在の推奨形態で本要件に合致する。" },
    { t:"CognitiveServices", c:false, e:"本来 kind=CognitiveServices は『従来型のマルチサービス リソース』で、Vision/Language/Speech などを 1 キーに束ねられる。しかしこの旧世代リソースには Azure OpenAI が含まれないため、『OpenAI も 1 リソースで』という本ケースの要件を満たせない。" },
    { t:"OpenAI", c:false, e:"本来 kind=OpenAI は Azure OpenAI 専用の『単一サービス リソース』で、GPT/DALL-E/埋め込み等を提供する。しかし単一サービスゆえ Vision/Language/Speech はこのリソースから呼べず、複数サービス統合という本ケースには不足する。" },
    { t:"TextAnalytics", c:false, e:"本来 kind=TextAnalytics は Language（旧 Text Analytics）専用の単一サービス リソース。テキスト分析のみを対象とし、OpenAI/Vision/Speech を含む統合用途には使えないため本ケースに不適。" }
  ],
  summary:"OpenAI を含めた統合は kind=AIServices。OpenAI を含まない従来マルチサービスは kind=CognitiveServices。単一サービス(OpenAI/TextAnalytics 等)は 1 機能専用。",
  keywords:[
    { k:"単一サービス リソース vs マルチサービス リソース", d:"単一サービス リソースは 1 機能専用（例: kind=OpenAI, Face, SpeechServices）。マルチサービス リソースは複数 API を 1 エンドポイント・1 キーで提供。課金とアクセス管理を一括化できるが、無料(F0)枠は単一サービス側にしか無い場合がある。" },
    { k:"kind=AIServices", d:"Microsoft Foundry の中核となる統合リソース。OpenAI・Vision・Language・Speech・Content Safety などを束ね、Foundry プロジェクトから利用される。旧 kind=CognitiveServices との最大の違いは OpenAI を内包する点。" }
  ]
},
{
  id:"q002", domain:"plan", type:"single",
  q:"本番稼働中のアプリが Azure AI services リソースのキー 1（Key1）を使用している。漏えいの恐れがあるためキーをローテーションするが、ダウンタイムを発生させてはならない。最初に実行すべき操作はどれか。",
  choices:[
    { t:"アプリの構成をキー 2（Key2）に切り替えてから、Key1 を再生成する", c:true, e:"2 つのキーが存在する理由がこれ。先に未使用の Key2 へ切替→Key1 を再生成→次回は Key1 に戻す、というローリングで無停止ローテーションを実現する。稼働中に使用中キーを触らないのが要点。" },
    { t:"Key1 を即座に再生成し、その後アプリを再起動する", c:false, e:"本来キー再生成は漏えい対応の正しい操作だが、実行の瞬間に旧 Key1 が無効化される。このケースではアプリがまだ Key1 を使っているため、再起動までの間リクエストが 401 になりダウンタイム(無停止要件違反)が生じる。" },
    { t:"両方のキー（Key1・Key2）を同時に再生成する", c:false, e:"本来両キーの再生成は『どちらも漏えいした』ときの最終手段。しかしこのケースではフェイルオーバー先の Key2 まで同時に失うため、切替先が無くなり無停止ローテーションが原理的に不可能になる。" },
    { t:"リソースを削除して再作成する", c:false, e:"本来リソース再作成は破損時などの復旧手段。しかしエンドポイントやリソース ID が変わり全クライアントの再構成と明確なダウンタイムを伴うため、単なるキー更新には過剰で無停止要件にも反する。" }
  ],
  summary:"2 つのキーは無停止ローテーションのために存在する。未使用キーへ切替→使用していたキーを再生成、の順。",
  keywords:[
    { k:"キーのローテーション", d:"`az cognitiveservices account keys regenerate --key-name Key1|Key2` で個別再生成。アプリは常に「今使っていない方」を再生成するのが鉄則。運用ではローテーション手順を自動化しておく。" },
    { k:"より安全な代替", d:"そもそもキーではなく Microsoft Entra ID（マネージド ID）認証に移行すれば、キー管理・ローテーション自体が不要になる。キーを使う場合も Key Vault 保管が推奨。" }
  ]
},
{
  id:"q003", domain:"plan", type:"single",
  q:"アプリのマネージド ID から Azure OpenAI の推論 API（チャット入力候補）を Microsoft Entra ID 認証で呼び出せるようにしたい。割り当てるべき組み込みロールはどれか。",
  choices:[
    { t:"Cognitive Services OpenAI User", c:true, e:"Azure OpenAI の推論（completions/chat/embeddings 等）を呼び出す最小権限ロール。データ プレーンの利用に必要十分で、最小権限原則に沿う。" },
    { t:"Cognitive Services OpenAI Contributor", c:false, e:"本来このロールは推論に加えてモデルのデプロイ作成やファインチューニング管理まで行える上位ロール。単に推論したいだけの本ケースでは権限過剰となり、最小権限原則に反する。" },
    { t:"Cognitive Services User", c:false, e:"本来これは汎用 Cognitive Services 用ロールで、リソースのキー一覧取得など一般的なデータ操作を許可する。しかし Azure OpenAI のデータプレーンには OpenAI 専用ロールが必要で、このロールでは推論エンドポイントを Entra 認証で呼べない。" },
    { t:"Contributor（共同作成者）", c:false, e:"本来 Contributor はリソースの作成・削除・設定変更など『管理プレーン』を操作するロール。推論 API 呼び出し(データプレーン)の許可とは軸が異なり、付与しても不適切な広範権限になるだけで要件に噛み合わない。" }
  ],
  summary:"推論だけなら『Cognitive Services OpenAI User』。デプロイ管理まで要るなら OpenAI Contributor。Contributor(管理者)はデータ呼び出しの最小権限ではない。",
  keywords:[
    { k:"管理プレーン vs データプレーン", d:"Contributor/Owner はリソースの作成・構成（管理プレーン）。推論 API の呼び出し（データプレーン）は OpenAI User/Contributor などデータ用ロールで制御される。両者は別物で、管理権限があってもデータ操作は許可されない。" },
    { k:"キーレス認証", d:"マネージド ID + RBAC により API キーを使わずに認証。キー漏えいリスクを排除でき、CI/CD やコンテナーでも推奨。ロールは目的(推論のみ/デプロイ管理も)に応じ最小を選ぶ。" }
  ]
},
{
  id:"q004", domain:"plan", type:"single",
  q:"Microsoft の責任ある AI（Responsible AI）の 6 原則に「含まれない」ものはどれか。",
  choices:[
    { t:"持続可能性（Sustainability）", c:true, e:"これは 6 原則に含まれない。環境配慮は重要なテーマだが、Responsible AI の公式 6 原則の構成要素ではないため、本問（含まれないもの）の答えとなる。" },
    { t:"包括性（Inclusiveness）", c:false, e:"本来これは 6 原則の 1 つで、障がいや言語・文化を問わず多様なユーザーが等しく恩恵を受けられるよう設計する原則。含まれるので『含まれないもの』を問う本問の答えにはならない。" },
    { t:"説明責任（Accountability）", c:false, e:"本来これは 6 原則の 1 つで、AI システムの挙動に対して人間が責任を持ち統制する原則。含まれるため本問の答えではない。" },
    { t:"信頼性と安全性（Reliability & Safety）", c:false, e:"本来これは 6 原則の 1 つで、意図した条件下で一貫かつ安全に動作することを求める原則。含まれるため本問の答えではない。" }
  ],
  summary:"6 原則 = 公平性 / 信頼性と安全性 / プライバシーとセキュリティ / 包括性 / 透明性 / 説明責任。持続可能性は含まれない。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"Fairness（公平性）, Reliability & Safety（信頼性と安全性）, Privacy & Security（プライバシーとセキュリティ）, Inclusiveness（包括性）, Transparency（透明性）, Accountability（説明責任）。『説明可能性(Explainability)』は透明性に内包される概念で独立原則ではない。" }
  ]
},
{
  id:"q005", domain:"plan", type:"single",
  q:"インターネットから完全に切断されたオンプレミス環境で、Azure AI services の OCR コンテナーを長期間継続運用する必要がある。前提として必須となるものはどれか。",
  choices:[
    { t:"切断モード（disconnected containers）用のコミットメント レベル（commitment tier）を事前購入する", c:true, e:"完全オフライン運用が許されるのは『切断コンテナー』のみで、その利用にはコミットメント プラン（前払いの使用量階層）の購入が必須。利用申請の承認も必要。" },
    { t:"従量課金（PAYG）の標準コンテナーをそのまま使う", c:false, e:"本来コンテナー化は OCR をオンプレで動かす有効手段。しかし標準(接続)コンテナーは定期的に Azure の課金エンドポイントへ使用量メータリングを送る必要があり、完全オフラインの本ケースでは通信できず動作を停止してしまう。" },
    { t:"コンテナーのみ起動し、課金エンドポイントとキーの環境変数は不要", c:false, e:"本来コンテナーは環境変数で構成するが、いずれの AI コンテナーも起動に Billing(エンドポイント)・ApiKey・Eula=accept の指定が必須。切断コンテナーでも初期化や定期検証で必要になるため『不要』は誤り。" },
    { t:"Docker ではなく Azure Container Instances 上でのみ実行する", c:false, e:"本来 ACI はコンテナーの手軽な実行基盤の 1 つ。しかし実行基盤の種類は切断運用の可否を決めない(むしろオフラインなら ACI は使えない)。切断運用の本質はコミットメント レベルの購入と承認であって、ホスティング先ではない。" }
  ],
  summary:"完全オフライン＝切断コンテナー＝コミットメント レベル購入が必須。標準コンテナーは定期的な課金メータリング通信が要る。",
  keywords:[
    { k:"コンテナーの種類", d:"標準（接続）コンテナーは Azure へ定期的に使用量を送信。切断（disconnected）コンテナーは事前購入したコミットメント枠内でオフライン動作でき、規制環境向け。利用には申請と承認が要る。" },
    { k:"コンテナー起動の必須環境変数", d:"`ApiKey`（リソースのキー）, `Billing`（リソースのエンドポイント）, `Eula=accept` の 3 つ。これが揃わないとコンテナーは起動しない。" }
  ]
},
{
  id:"q006", domain:"plan", type:"single",
  q:"Azure AI Content Safety のテキスト分析で、あるカテゴリの重大度（severity）が他より細かい 0〜7 の 8 段階で返されない既定設定がある。Content Safety が分類する 4 つの危害カテゴリの組み合わせとして正しいものはどれか。",
  choices:[
    { t:"Hate / Sexual / Violence / Self-Harm", c:true, e:"Content Safety の有害カテゴリは『憎悪と公平性(Hate)』『性的(Sexual)』『暴力(Violence)』『自傷(Self-Harm)』の 4 つ。各カテゴリに重大度が付与され、アプリ側でしきい値を決めてブロックする。" },
    { t:"Hate / Spam / Phishing / Malware", c:false, e:"本来 Spam/Phishing/Malware はメール/ネットワーク セキュリティの脅威分類。Content Safety が扱う『人への危害』カテゴリではないため、この組み合わせは誤り。" },
    { t:"Toxicity / Bias / Profanity / PII", c:false, e:"本来 PII 検出は Azure Language、Profanity(冒涜語)フィルタは翻訳や音声の別機能に相当する概念。Content Safety の 4 危害カテゴリの正式名称ではないので不適。" },
    { t:"Jailbreak / Indirect Attack / Grounding / Protected Material", c:false, e:"本来これらは Content Safety の『別機能』の名称——Prompt Shields(ジェイルブレイク/間接攻撃検出)・グラウンド検出・保護対象素材検出——であって、危害『カテゴリ』ではない。カテゴリと機能名を混同させる引っかけ。" }
  ],
  summary:"4 危害カテゴリ = Hate・Sexual・Violence・Self-Harm。Prompt Shields/グラウンド検出/保護素材検出は別機能。",
  keywords:[
    { k:"重大度レベル", d:"テキストは API 構成により 0〜7（フル）または 0/2/4/6（簡略 4 段階）で返る。画像は 0/2/4/6。0 は無害。アプリ側でしきい値を決めブロックする。" },
    { k:"Prompt Shields", d:"ユーザー プロンプトへの直接攻撃（ジェイルブレイク）と、取り込み文書に埋め込まれた間接攻撃（indirect/cross-domain prompt injection）を検出する別機能。危害カテゴリとは別物。" }
  ]
},
{
  id:"q007", domain:"plan", type:"single",
  q:"Azure AI services リソースの診断ログ（Diagnostic Logs）を一定期間保持し、KQL でクエリして傾向を分析したい。送信先として構成すべきものはどれか。",
  choices:[
    { t:"Log Analytics ワークスペース", c:true, e:"診断設定のログを Log Analytics に送ると KQL（Kusto）でクエリ・分析でき、保持期間も設定できる。傾向分析の定番の送信先。" },
    { t:"Azure Key Vault", c:false, e:"本来 Key Vault はシークレット/キー/証明書を安全に保管する金庫。ログの保持・クエリを行う分析基盤ではないため、KQL 分析という本ケースの送信先にはならない。" },
    { t:"Azure Cache for Redis", c:false, e:"本来 Redis はインメモリの低遅延キャッシュ/データ構造ストア。アプリの高速化に使うもので、診断ログの長期保持や KQL 分析の用途ではない。" },
    { t:"Azure Container Registry", c:false, e:"本来 ACR はコンテナー イメージを保管・配布するレジストリ。ログの保存/分析とは無関係で、送信先として成立しない。" }
  ],
  summary:"診断ログの KQL 分析は Log Analytics ワークスペース。長期アーカイブだけなら Storage、リアルタイム連携は Event Hub。",
  keywords:[
    { k:"診断設定の 3 つの送信先", d:"①Log Analytics（KQL 分析）②ストレージ アカウント（安価な長期アーカイブ）③Event Hub（SIEM 等への外部ストリーミング）。用途で使い分ける。" },
    { k:"メトリック vs ログ", d:"数値メトリック（呼び出し数/遅延/エラー率）は Azure Monitor メトリックで即時可視化。詳細なイベントは診断ログとして上記送信先へ。" }
  ]
},
{
  id:"q008", domain:"plan", type:"single",
  q:"規制要件により、Azure OpenAI のデプロイで処理されるデータが特定の Azure リージョン内に必ず留まる（データ所在地が保証される）必要がある。選択すべきデプロイの種類はどれか。",
  choices:[
    { t:"Standard（リージョン）デプロイ", c:true, e:"Standard(リージョン)デプロイはリソースを作成したリージョン内で処理され、データ所在地が保証される。リージョン固定の規制要件に適合する唯一の一般的選択。" },
    { t:"Global Standard デプロイ", c:false, e:"本来 Global Standard は世界中の空き容量へ動的ルーティングして高スループット/低コストを得る形態。しかし処理リージョンが固定されず、データ所在地を保証できないため、リージョン固定の規制要件には使えない。" },
    { t:"Global Batch デプロイ", c:false, e:"本来 Global Batch は大量リクエストを非同期にまとめて安価に処理する形態。コスト効率は高いがこれもグローバル ルーティングで特定リージョン保証がなく、所在地要件を満たさない。" },
    { t:"Global Provisioned デプロイ", c:false, e:"本来 Global Provisioned は予約容量(PTU)をグローバルに使い安定スループットを得る形態。安定性はあるが『グローバル』ゆえリージョン固定の所在地保証はなく、本要件には合わない（必要ならリージョン版 Provisioned を選ぶ）。" }
  ],
  summary:"データ所在地を固定したいなら Global ではなく『Standard（リージョン）』またはリージョン版 Provisioned。Global 系は所在地を固定しない代わりに容量/コストで有利。",
  keywords:[
    { k:"Global vs リージョン デプロイ", d:"Global（Standard/Batch/Provisioned）は世界中の空き容量へルーティングし可用性・コスト・スループットで有利だが処理リージョンを固定しない。リージョン デプロイはデータ所在地を保証する代わりに容量制約が厳しめ。" },
    { k:"Batch デプロイ", d:"大量リクエストを非同期にまとめ、24 時間以内処理・低コストの代わりに即時応答しない。バックグラウンドの大量処理向け。" }
  ]
},
{
  id:"q009", domain:"plan", type:"single",
  q:"Azure AI services リソースへのアクセスを、同一 Azure 仮想ネットワーク内のアプリと特定のオンプレミス IP のみに限定したい。Networking 設定の構成として最も適切なものはどれか。",
  choices:[
    { t:"『選択されたネットワークとプライベート エンドポイント』を選び、許可する VNet/サブネットとファイアウォール IP 範囲を追加する", c:true, e:"選択ネットワークは許可リスト方式となり、指定した VNet・サブネット・公開 IP からのみアクセスを許可する。VNet 内アプリと特定オンプレ IP の双方を許可したい本要件に最も合致する。" },
    { t:"『すべてのネットワーク』を選ぶ", c:false, e:"本来これは既定で、検証や公開 API では手軽。しかしインターネットを含む任意の発信元を許可してしまい、『VNet と特定 IP のみ』という限定要件に真っ向から反する。" },
    { t:"パブリック ネットワーク アクセスを無効化し、プライベート エンドポイントのみにする（IP 許可は使わない）", c:false, e:"本来これはインターネット非公開にする最も厳格な構成で、VNet 内利用だけなら最適。しかし本ケースは特定オンプレ IP からのパブリック経由アクセスも残したいため、完全無効化ではその IP を弾いてしまい要件に足りない。" },
    { t:"リソースのキーを Key Vault に保存する", c:false, e:"本来 Key Vault 保管はキー漏えい対策として推奨されるが、これは『認証情報の守り方』であってネットワーク到達制御ではない。誰がネットワーク的に到達できるかを限定する本要件は満たせない。" }
  ],
  summary:"特定 VNet＋特定 IP からのみ＝『選択されたネットワーク』で許可リスト構成。VNet 内のみで十分なら public 無効化＋Private Endpoint。",
  keywords:[
    { k:"ネットワーク アクセス 3 択", d:"①すべてのネットワーク（既定・無制限）②選択されたネットワーク（VNet/サブネット/IP の許可リスト）③無効＋プライベート エンドポイント（インターネット非公開）。" },
    { k:"プライベート エンドポイント", d:"VNet 内のプライベート IP でリソースに到達。トラフィックが Microsoft バックボーン内に留まり、パブリック露出を排除できる。" }
  ]
},
{
  id:"q010", domain:"plan", type:"multi",
  q:"生成 AI ソリューションに『責任ある AI』を実装するため、出力の安全性を高める対策を講じたい。Azure の機能として有効な対策を 3 つ選べ。",
  choices:[
    { t:"コンテンツ フィルター（カテゴリ別の重大度しきい値）を構成する", c:true, e:"Azure OpenAI のコンテンツ フィルターは入力/出力を Hate/Sexual/Violence/Self-Harm で評価し、しきい値超過をブロックする。標準的で有効な安全策。" },
    { t:"Prompt Shields を有効化してジェイルブレイク/間接攻撃を検出する", c:true, e:"プロンプト インジェクション（直接のジェイルブレイクと、文書に埋め込まれた間接攻撃）を検出・ブロックし、有害動作の誘発を防ぐ有効な対策。" },
    { t:"ブロックリスト（カスタム用語）を追加する", c:true, e:"組織固有の禁止語・パターンをカスタム ブロックリストで定義し、既定フィルタでは拾えない語を補完できる有効な対策。" },
    { t:"温度（temperature）を 0 に固定すれば有害出力は完全に防げる", c:false, e:"本来 temperature は出力のランダム性(多様性)を制御するサンプリング パラメーター。0 にしても出す内容そのものを安全化する機構ではなく、有害コンテンツは依然生成され得るため安全対策としては誤り。" },
    { t:"合成データのみでファインチューニングすれば安全性が保証される", c:false, e:"本来ファインチューニングは挙動を特定方向へ寄せる手法。合成データのみの学習は現実的応答能力を損ないがちで、かつ安全性を『保証』する機構ではない。コンテンツ フィルタ等の安全機構の代替にはならない。" }
  ],
  summary:"安全策の柱＝コンテンツ フィルター・Prompt Shields・ブロックリスト（＋グラウンド検出/保護素材検出/赤チーム演習）。パラメータ調整や合成データは安全機構ではない。",
  keywords:[
    { k:"コンテンツ フィルター", d:"プロンプトと生成の双方を 4 カテゴリで評価。重大度しきい値は構成可能。注釈(annotate)のみとブロックを選べ、ストリーミング用の非同期フィルタもある。" },
    { k:"グラウンド検出（Groundedness detection）", d:"モデル出力が提供ソースに裏付けられているか（幻覚でないか）を検出する Content Safety 機能。RAG の信頼性向上に使う。" }
  ]
},

/* ===== 2. 生成 AI ソリューションを実装する (genai) ======================= */

{
  id:"q011", domain:"genai", type:"single",
  q:"Azure OpenAI のデプロイで特定のモデル バージョンを選び、自動更新を無効にしていた。にもかかわらず、後日そのデプロイが新バージョンを使用していた。最も妥当な理由はどれか。",
  choices:[
    { t:"選択していたモデル バージョンが提供終了（廃止）日に達し、既定バージョンへ自動アップグレードされた", c:true, e:"自動更新が無効でも、選択中バージョンが retirement 日に達すると、サービス継続のため既定（後継）バージョンへ強制アップグレードされる。手動固定でも避けられない唯一の妥当な説明。" },
    { t:"自動更新は常に有効で無効化できない", c:false, e:"本来 Azure OpenAI はデプロイ単位で更新方針（自動更新/新版公開時/固定）を選べる。『常に有効で無効化不可』は事実に反し、自動更新を無効化していたという設問前提とも矛盾する。" },
    { t:"新バージョン公開時に自動更新が自動で有効化される", c:false, e:"本来『新バージョン公開時にアップグレード』という選択肢は存在するが、それはユーザーが明示的に選んだ場合のみ。無効化した設定が勝手に有効へ切り替わる仕様はないため誤り。" },
    { t:"更新が 5 世代以上古くなると自動更新される", c:false, e:"本来アップグレードのトリガーは『提供終了(retirement)日』であって世代数ではない。『5 世代』のような世代カウントの自動更新条件は存在しないため誤り。" }
  ],
  summary:"手動固定でも『提供終了日』に達したバージョンは既定後継へ強制アップグレードされる。だから廃止スケジュールの監視が必要。",
  keywords:[
    { k:"モデルのライフサイクル", d:"各モデル バージョンには公開・既定化・廃止(retirement)のスケジュールがある。デプロイは『自動更新（既定に追随）』『新版公開時アップグレード』『固定』を選べるが、廃止日は固定でも回避できない。" }
  ]
},
{
  id:"q012", domain:"genai", type:"single",
  q:"Azure OpenAI の『データを使用する（On Your Data）』で社内ナレッジを根拠に回答させている。回答に無関係なドキュメントが混入する。関連性の低い文書を除外するために調整するパラメーターはどれか。",
  choices:[
    { t:"厳密度（strictness）", c:true, e:"strictness はドキュメントを『関連』と見なす分類しきい値。値を上げると関連性の高い文書だけが採用され、無関係文書が除外される。まさに本要件のためのつまみ。" },
    { t:"取得したドキュメント数（top n documents / retrieved documents）", c:false, e:"本来これは検索で LLM に渡す上位ヒット件数を決めるパラメーター。増やすほど網羅性は上がるが無関係文書も入りやすくなり、『関連性の低い文書を除外したい』本ケースの目的とはむしろ逆方向に働く。" },
    { t:"コンテンツ データ（content data フィールド）", c:false, e:"本来これは各文書の本文テキストが入るインデックス フィールドを指定する設定(どの列を本文として使うか)。関連性を判定するしきい値ではないため、無関係文書の除外には効かない。" },
    { t:"ファイル名（filename フィールド）", c:false, e:"本来これは各文書の元ファイル名が入るフィールドの指定で、引用元表示などに使う。関連性フィルタリングの機能を持たないため本ケースに無関係。" }
  ],
  summary:"無関係文書の除外＝strictness を上げる。retrieved documents を増やすのは逆効果。",
  keywords:[
    { k:"strictness と top n documents", d:"strictness（1〜5）は関連性しきい値で、高いほど厳選＝再現率↓精度↑、低いほど網羅↑だがノイズ↑。top n documents は LLM に渡す検索ヒット件数。両者は別の調整軸。" },
    { k:"クエリの種類", d:"On Your Data は keyword / semantic / vector / hybrid / vectorSemanticHybrid を選べる。vector/semantic 系の方が関連性把握に優れるが、vector には埋め込みモデルのデプロイとベクター フィールドが必要。" }
  ]
},
{
  id:"q013", domain:"genai", type:"single",
  q:"DALL-E 3 に対して Azure OpenAI REST API で画像生成リクエストを送る。HTTP『ヘッダー』ではなく『要求本文(body)』に含めるべき項目はどれか。",
  choices:[
    { t:"prompt（生成したい画像の説明）", c:true, e:"prompt・size・quality・style・n などの生成パラメーターは JSON の要求本文に入れる。prompt は生成内容を決める本文の中核項目。" },
    { t:"使用する API バージョン", c:false, e:"本来 api-version は呼び出しに必須の情報だが、指定場所は URL のクエリ文字列(接続側)であって要求本文ではない。本文項目として扱うのは誤り。" },
    { t:"api-key（リソースのキー）", c:false, e:"本来 api-key は認証に必須だが、送る場所は `api-key` ヘッダー(または Authorization ベアラー)。本文に入れる項目ではないため誤り。" },
    { t:"Content-Type", c:false, e:"本来 Content-Type は本文の形式(application/json)を示す HTTP ヘッダー。ボディの中身ではなくヘッダーなので、本文項目を問う本問には当てはまらない。" }
  ],
  summary:"ヘッダー＝api-key / Content-Type、URL＝エンドポイント＋デプロイ名＋api-version、本文＝prompt/size/quality/style/n。",
  keywords:[
    { k:"DALL-E 3 の body パラメーター", d:"size は 1024x1024 / 1792x1024 / 1024x1792、quality は standard/hd、style は vivid/natural。dall-e-3 では n=1 のみ（複数枚同時生成不可）。" },
    { k:"エンドポイント構成", d:"URL に『リソース エンドポイント＋デプロイ名＋api-version』を含める。これらは『本文』ではなく URL/接続側の要素である点が頻出の引っかけ。" }
  ]
},
{
  id:"q014", domain:"genai", type:"single",
  q:"創造性を抑え、最も確度の高い決定論的な回答を生成させたい。チャット入力候補で調整すべきパラメーターと値として最適なものはどれか。",
  choices:[
    { t:"temperature を 0 に近づける", c:true, e:"temperature はサンプリングのランダム性を決める。0 付近では常に最も確率の高いトークンを選ぶため、決定論的で安定した回答になり、本要件に合致する。" },
    { t:"presence_penalty を上げる", c:false, e:"本来 presence_penalty は『既出の話題』に一律ペナルティを与えて新しい話題を促す設定。多様性・話題転換を増やす方向であり、決定論性を高めたい本ケースとは目的が逆。" },
    { t:"frequency_penalty を上げる", c:false, e:"本来 frequency_penalty は同じ語の反復を抑えるための設定で、語彙の重複低減が目的。回答の確度や決定論性を制御するものではないため、本要件には効かない。" },
    { t:"max_tokens を大きくする", c:false, e:"本来 max_tokens は出力の最大長を制限する上限値。長さを変えるだけでランダム性や確度には影響せず、決定論的にする目的とは無関係。" }
  ],
  summary:"決定論性＝temperature（または top_p）を下げる。temperature と top_p は同時に両方いじらないのが原則。",
  keywords:[
    { k:"temperature と top_p", d:"temperature は分布の鋭さ、top_p は累積確率での候補絞り（核サンプリング）。両方を同時に下げると効果が二重になり予測しづらいので、通常はどちらか一方を調整する。" },
    { k:"presence_penalty vs frequency_penalty", d:"presence_penalty は『一度でも登場したか』で一律ペナルティ→新規話題促進。frequency_penalty は『登場回数』に比例しペナルティ→同語反復抑制。目的が異なる。" }
  ]
},
{
  id:"q015", domain:"genai", type:"single",
  q:"Microsoft Foundry でデプロイした生成 AI フローについて、要求トレース・集計メトリック・ユーザー フィードバックを最小の管理作業で収集したい。最適な方法はどれか。",
  choices:[
    { t:"デプロイの設定から Application Insights の診断設定を構成する", c:true, e:"Foundry はデプロイ レベルで Application Insights とネイティブ統合する。ポータルで診断を有効化するだけでトレース・メトリック・フィードバック収集が有効になり、最小の管理作業という要件に合う。" },
    { t:"デプロイの YAML に環境変数を追加する", c:false, e:"本来 YAML の環境変数はランタイムの設定値(接続先やフラグ等)を渡す仕組み。テレメトリ基盤を有効化する役割はなく、環境変数を足すだけではトレース/フィードバックは動かない。" },
    { t:"デプロイの YAML にプロパティを追加する", c:false, e:"本来プロパティ追記はデプロイのメタ設定を宣言する手段。しかしこれだけで Application Insights 連携やフィードバック収集が自動で立ち上がるわけではなく、必要な統合は得られない。" },
    { t:"フロー定義の YAML を書き換える", c:false, e:"本来フロー YAML はステップの流れ(オーケストレーション ロジック)を定義する。挙動は変えられるが、デプロイ レベルの監視・診断(トレース/メトリック収集)を有効化する場所ではない。" }
  ],
  summary:"Foundry デプロイの監視/フィードバックは Application Insights 診断設定で有効化（最小作業・ネイティブ統合）。",
  keywords:[
    { k:"トレース（Tracing）", d:"フロー内の各ステップ（プロンプト/取得/モデル呼び出し）の入出力・遅延・トークンを記録し、デバッグや品質分析に使う。Foundry では Application Insights に送られる。" }
  ]
},
{
  id:"q016", domain:"genai", type:"multi",
  q:"社内ナレッジに基づくチャットボットの『取得→処理』能力を高める。Azure OpenAI と組み合わせる適切なアクションを 2 つ選べ。",
  choices:[
    { t:"Azure AI Search でナレッジ ベースの検索インデックスを作成する", c:true, e:"文書を索引化し、質問に関連するチャンクを高速に取得できる。RAG の『取得(retrieval)』を担う標準構成で、本要件に直結する。" },
    { t:"Embeddings API を統合してクエリ/文書をベクトル化する", c:true, e:"意味的類似に基づく検索（ベクター検索）を可能にし、言い回しが違っても意図に近い文書を取得できる。取得と意図理解の精度を高める有効策。" },
    { t:"カスタム言語モデルを一からトレーニングする", c:false, e:"本来ゼロからの独自モデル学習は特殊要件向けで高コスト・高難度。GPT 系の事前学習済みモデルで十分対応でき、RAG の『取得』能力向上には寄与しないため、この文脈では不要かつ的外れ。" },
    { t:"文書解析に AI Vision を使う", c:false, e:"本来 AI Vision は画像のタグ付け/OCR/物体検出など『視覚』の解析ツール。テキストのナレッジ ベースを索引化・取得する用途には適さず、本ケースの取得強化には結びつかない。" }
  ],
  summary:"RAG 強化の定石＝AI Search（インデックス）＋ Embeddings（ベクター化）。独自学習や画像 AI は的外れ。",
  keywords:[
    { k:"RAG（検索拡張生成）", d:"質問に関連する文書を検索で取り出し、その内容をプロンプトに添えて LLM に回答させる方式。最新・社内固有の知識を、再学習なしに根拠付きで反映できる。" },
    { k:"統合ベクトル化（integrated vectorization）", d:"AI Search が取り込み時にテキスト分割＋埋め込み生成（AzureOpenAIEmbedding スキル）を自動実行し、クエリ時もベクター化する仕組み。RAG 構築を簡素化する。" }
  ]
},
{
  id:"q017", domain:"genai", type:"single",
  q:"プロンプト エンジニアリングや RAG では解決できず、特定ドメインの文体・形式・分類ラベルへ一貫して挙動を合わせたい。最も適切な手法はどれか。",
  choices:[
    { t:"教師ありファインチューニング（fine-tuning）を行う", c:true, e:"望ましい入出力ペアでモデルの重みを微調整し、特定の文体/形式/分類へ安定して寄せられる。プロンプトや RAG で賄えない『挙動そのものの一貫化』に有効な手法。" },
    { t:"RAG の取得件数を増やす", c:false, e:"本来 RAG は外部知識を補って回答の事実性を上げる仕組み。取得件数を増やしても供給される『知識』が増えるだけで、モデルの根本的な振る舞い(文体・形式)は変わらないため本要件を満たせない。" },
    { t:"temperature を上げる", c:false, e:"本来 temperature は出力の多様性を制御するパラメーター。上げるとランダム性が増し一貫性はむしろ低下するので、挙動を固定・一貫化したい本ケースとは逆効果。" },
    { t:"max_tokens を増やす", c:false, e:"本来 max_tokens は出力長の上限設定。長く出せるようになるだけで文体や分類の挙動には影響せず、一貫化には寄与しない。" }
  ],
  summary:"知識不足は RAG、挙動/文体/形式の一貫化はファインチューニング、というのが使い分けの定石。",
  keywords:[
    { k:"ファインチューニング vs RAG vs プロンプト", d:"プロンプト/Few-shot は手軽だが限界あり。RAG は事実知識を外部から供給。ファインチューニングは挙動そのものを学習。コストと目的で選ぶ（まず安価な手法から）。" }
  ]
},
{
  id:"q018", domain:"genai", type:"single",
  q:"RAG ソリューションの品質を Microsoft Foundry の評価機能で測定する。回答が『提供したコンテキストに裏付けられているか（幻覚でないか）』を測る評価メトリックはどれか。",
  choices:[
    { t:"グラウンド性（Groundedness）", c:true, e:"回答が与えたソース文脈に根拠を持つか（裏付けられているか）を測る指標。RAG の幻覚検出に直結し、本要件そのものを評価する。" },
    { t:"流暢性（Fluency）", c:false, e:"本来 Fluency は文章の自然さ・文法的正しさを測る指標。読みやすさは分かるが、内容が事実・ソースに裏付けられているかは評価しないため本ケースの目的には合わない。" },
    { t:"一貫性（Coherence）", c:false, e:"本来 Coherence は文の論理的つながり・全体のまとまりを測る指標。文章構成の質を見るもので、根拠の有無(幻覚か)は判定しない。" },
    { t:"類似性（Similarity）", c:false, e:"本来 Similarity は正解(ground truth)と生成回答の意味的近さを測る指標。正解データとの一致は見るが、『提供コンテキストへの裏付け』とは別軸のため本問には合わない。" }
  ],
  summary:"RAG の幻覚検出は Groundedness。relevance は質問との関連、fluency/coherence は文章品質、similarity は正解との一致。",
  keywords:[
    { k:"AI 支援の品質メトリック", d:"Groundedness（根拠）・Relevance（質問関連性）・Coherence（一貫性）・Fluency（流暢性）・Similarity/F1（正解一致）。Foundry の evaluation でフロー/モデルを定量比較できる。" }
  ]
},
{
  id:"q019", domain:"genai", type:"single",
  q:"アプリは独自スキーマの JSON を厳密に返させたい。Azure OpenAI で、出力が必ず指定スキーマに準拠することを最も強く保証する機能はどれか。",
  choices:[
    { t:"Structured Outputs（JSON スキーマ指定）", c:true, e:"レスポンス形式に JSON スキーマを与え、モデル出力がそのスキーマ(必須プロパティ/型)に厳密準拠することを保証する。スキーマ厳守の最も強い保証手段。" },
    { t:"JSON モード（response_format=json_object）", c:false, e:"本来 JSON モードは『構文的に妥当な JSON』であることは保証する。しかし特定スキーマ(どのキーがあり型は何か)への準拠までは保証しないため、独自スキーマ厳守という本要件には一段弱い。" },
    { t:"stop シーケンスの設定", c:false, e:"本来 stop は指定文字列が現れたら生成を打ち切るための制御。出力の途中終了を制御するだけで、構造(スキーマ)を保証する機能ではないため無関係。" },
    { t:"logit_bias の調整", c:false, e:"本来 logit_bias は特定トークンの出やすさを増減させる低レベル制御。個々の語の傾向は変えられるが、JSON 構造やスキーマ準拠を保証するものではない。" }
  ],
  summary:"スキーマ厳守＝Structured Outputs。JSON モードは『JSON である』ことのみ保証しスキーマ準拠までは担保しない。",
  keywords:[
    { k:"Structured Outputs と関数呼び出し", d:"関数呼び出し（tools）も引数を構造化 JSON で受け取れる。strict 指定でスキーマ厳守を強められる。確実な機械可読出力が必要な統合で有効。" }
  ]
},
{
  id:"q020", domain:"genai", type:"single",
  q:"予測可能で安定したスループットと専用容量、固定的な月額コストを求める高負荷の本番 Azure OpenAI ワークロードに最適な課金/デプロイ形態はどれか。",
  choices:[
    { t:"プロビジョニング済みスループット ユニット（PTU / Provisioned）", c:true, e:"専用容量を予約し、安定した高スループットと予測可能な定額コストを得る形態。大規模かつ遅延要件の厳しい本番に最適で、本要件に合致する。" },
    { t:"Standard（従量課金 / TPM ベース）", c:false, e:"本来 Standard は使った分だけ課金され小〜中規模や実験に手軽。しかし共有容量ゆえスループットが変動しスロットリングし得るうえコストも変動するため、『予測可能・専用容量』という本要件には劣る。" },
    { t:"Batch", c:false, e:"本来 Batch は大量リクエストを非同期にまとめて安価に処理する形態。即時応答しない前提のため、安定したオンライン スループットが要る本ケースには向かない。" },
    { t:"無料(F0)レベル", c:false, e:"本来 F0 は検証・学習用の無料枠で、クォータが非常に小さい。高負荷の本番トラフィックには容量が足りず不適。" }
  ],
  summary:"予測可能な専用容量＝PTU(Provisioned)。可変・小規模・実験は Standard(TPM)。大量非同期は Batch。",
  keywords:[
    { k:"TPM と PTU", d:"TPM（tokens per minute）は従量・共有容量のクォータ。PTU は専有容量の予約単位で、スループットと遅延が安定し課金も定額的。負荷とコスト特性で選ぶ。" }
  ]
},

/* ===== 3. エージェント ソリューションを実装する (agent) ================= */

{
  id:"q021", domain:"agent", type:"single",
  q:"Microsoft Foundry Agent Service のエージェントに、会議のスケジュール設定や通知送信など『独自の外部処理をプログラム実行』させたい。構成すべきものはどれか。",
  choices:[
    { t:"カスタム関数（function calling のツール）を追加する", c:true, e:"独自関数をツールとして登録すると、モデルが必要時にその関数呼び出しを生成し、会議設定や通知送信などの外部処理を動的に実行できる。要件に最適。" },
    { t:"静的テンプレートを構成する", c:false, e:"本来テンプレートは応答文の定型フォーマットを与える手段。固定の文面整形はできるが、状況に応じて外部アクションを実行する動的性がなく、プログラム実行という本要件を満たせない。" },
    { t:"既定のモデル機能のみを有効化する", c:false, e:"本来 LLM 単体はテキスト生成が仕事で、外部システムへの副作用(会議作成/通知送信)を自力で起こせない。ツール統合なしでは特定の外部アクションを実行できないため不十分。" },
    { t:"事前トレーニング済みチャットボット フレームワークをそのまま使う", c:false, e:"本来こうしたフレームワークは会話体験の土台を素早く用意できる。しかしカスタマイズ(独自関数の接続)なしでは当該の外部処理を実行できず、本要件の具体タスクには対応できない。" }
  ],
  summary:"外部処理の動的実行＝function calling（カスタム関数ツール）。テンプレや素のモデルでは不可。",
  keywords:[
    { k:"Agent Service のツール", d:"function calling（独自関数）, code interpreter（コード実行）, file search（ファイル根拠付け）, Bing grounding（Web リアルタイム）, Azure AI Search, OpenAPI ツールなどを束ねてエージェントに能力を与える。" }
  ]
},
{
  id:"q022", domain:"agent", type:"single",
  q:"Azure リソースと統合しつつ、複数エージェントのオーケストレーションを伴う複雑なワークフローを構築したい。最適なフレームワークはどれか。",
  choices:[
    { t:"Semantic Kernel（セマンティック カーネル）", c:true, e:"生成 AI のオーケストレーションとマルチエージェント ワークフローをサポートし、Azure と統合できる SDK。複数エージェント協調という本要件に合致する。" },
    { t:"Azure Bot Framework", c:false, e:"本来 Bot Framework はチャネル横断の会話ボットを作る枠組み。1 つのボットの会話には強いが、複数エージェントを編成・協調させるオーケストレーションを主目的とせず、本要件には不足する。" },
    { t:"Azure Machine Learning Studio", c:false, e:"本来 AML Studio は機械学習モデルの学習・実験・デプロイの基盤。エージェント同士の調整やワークフロー編成の道具ではないため、この用途には合わない。" },
    { t:"Cognitive Services API（単体呼び出し）", c:false, e:"本来これは事前構築 AI 機能(言語/音声/視覚等)を呼ぶ API 群。個別タスクは解けるが、複数エージェントを束ねて協調させる調整機能を持たないため本要件には不適。" }
  ],
  summary:"マルチエージェント オーケストレーション＝Semantic Kernel（および Microsoft Agent Framework）。Bot Framework は会話ボット、AML は学習基盤。",
  keywords:[
    { k:"Microsoft Agent Framework / Semantic Kernel", d:"プラグイン・プランナー・メモリでツールやモデルを編成し、複数エージェント協調を実装できる SDK。Foundry Agent Service と組み合わせて高度なワークフローを作る。" }
  ]
},
{
  id:"q023", domain:"agent", type:"multi",
  q:"Foundry Agent Service のエージェントを外部 API と対話させ、リアルタイム データを応答に使う。実行すべきアクションを 3 つ選べ。",
  choices:[
    { t:"API アクセス用のツールを定義する", c:true, e:"外部 API を呼ぶためのツール（関数/OpenAPI）を定義することで、エージェントが実行時に API と対話できるようになる。連携の起点となる必須アクション。" },
    { t:"Azure SDK を使ってエージェントをデプロイする", c:true, e:"SDK でエージェントをデプロイし Azure 環境内で稼働させることで、定義したツールを通じた API 連携を実行可能にする。" },
    { t:"Bing 検索ツールを構成する", c:true, e:"Bing grounding ツールを構成すると、Web 上のリアルタイム データにアクセスして応答に反映できる。リアルタイム性という要件に応える。" },
    { t:"コードで API 応答を手動でパースする", c:false, e:"本来 API 応答の解析はコードで書く発想も自然。しかし Agent Service はツール呼び出しと応答処理を自動化するため、手動パースの実装は不要で本タスクの必須手順ではない。" },
    { t:"会話状態の保持に Blob Storage を使う", c:false, e:"本来 Blob は大容量データの保管に有効。しかし会話状態はスレッド(threads)がサービス側で自動管理するため、状態保持のために Blob を用意する必要はない。" },
    { t:"Azure AI Search リソースを必ず設定する", c:false, e:"本来 AI Search は社内文書の RAG 検索に有用。しかし外部 API とのリアルタイム連携という本要件には必須ではなく、任意の追加要素にすぎない。" }
  ],
  summary:"API 連携＝①ツール定義 ②SDK でデプロイ ③Bing 等のツール構成。状態はスレッドが自動管理、応答も自動処理。",
  keywords:[
    { k:"スレッド/実行/メッセージ", d:"Agent Service は thread に会話履歴を保持し、run でツール呼び出しを含む推論を実行、message で入出力をやり取りする。会話状態管理を肩代わりしてくれる。" }
  ]
},
{
  id:"q024", domain:"agent", type:"multi",
  q:"Foundry Agent Service でエージェントを作成する際、グラウンド プロンプトとコンテキスト データを適用し、挙動とアイデンティティを定義するために『最低限指定が必要』な構成要素を 3 つ選べ。",
  choices:[
    { t:"名前（name）", c:true, e:"エージェントを識別する基本要素。作成時に指定が必要。" },
    { t:"モデル デプロイ（model deployment）", c:true, e:"エージェントが推論に使う基盤モデルのデプロイを指す必須要素。どの LLM で動くかを定める。" },
    { t:"指示（instructions）", c:true, e:"システム指示。グラウンド プロンプトの適用やソース文書化を含む挙動・アイデンティティを定義する必須要素。" },
    { t:"ツール（tools）", c:false, e:"本来ツールはエージェントに外部機能を与える強力な要素。しかし外部機能を呼ぶ必要があるときだけ追加する任意要素であり、最低限の作成には必須ではない。" },
    { t:"YAML ファイル", c:false, e:"本来 YAML はエージェント定義を宣言的に書ける『記述形式』の 1 つ。定義の入れ物であって、エージェントの構成要素そのものではないため、必須項目としては数えない。" }
  ],
  summary:"エージェント作成の必須 3 要素＝name・model deployment・instructions。tools は任意、YAML は単なる記述形式。",
  keywords:[
    { k:"instructions（システム指示）", d:"エージェントの役割・口調・禁止事項・根拠の示し方を規定する中核設定。RAG のグラウンディング指示やソース引用ルールもここに書く。" }
  ]
},

/* ===== 4. コンピューター ビジョン (vision) ============================= */

{
  id:"q025", domain:"vision", type:"single",
  q:"スキャンした領収書から、合計金額・日付・店名などの『特定フィールド』を最小の開発作業で構造化抽出したい。最適なサービスはどれか。",
  choices:[
    { t:"Azure AI Document Intelligence（事前構築済み領収書モデル）", c:true, e:"領収書 prebuilt モデルが合計・日付・販売者などをキー/値で構造化抽出する。学習不要で最小開発、まさに本要件のためのサービス。" },
    { t:"Azure AI Vision（OCR/Read）", c:false, e:"本来 Vision の OCR(Read)は画像内の文字を座標付きで読む機能。文字は取れるが『どの数値が合計で、どれが日付か』という意味的フィールド抽出は自前実装が必要になり、開発作業が増えて『最小開発』要件に反する。" },
    { t:"Azure AI Custom Vision", c:false, e:"本来 Custom Vision は独自の画像分類/物体検出モデルを作るサービス。画像の内容分類には向くが、文書からのキー/値フィールド抽出は守備範囲外で不適。" },
    { t:"Azure Machine Learning", c:false, e:"本来 AML は任意の ML モデルを一から設計・学習できる汎用基盤。領収書抽出も作れるがデータ収集・学習・運用を全て自作する必要があり、開発作業が最大化するため『最小開発』要件に最も遠い。" }
  ],
  summary:"領収書/請求書/ID 等の構造化抽出は Document Intelligence の prebuilt。Vision の OCR は『文字読み取り』止まりで意味付けは別途。",
  keywords:[
    { k:"OCR と Document Intelligence の違い", d:"OCR（Read）は文字を座標付きで読むだけ。Document Intelligence は読み取り＋『この値は合計、これは日付』という構造（key-value/テーブル/フィールド）まで返す。" },
    { k:"prebuilt モデル", d:"領収書・請求書・身分証明書・名刺・W-2・layout・read など、学習済みで即利用できるモデル群。一般的な文書は学習なしで構造抽出できる。" }
  ]
},
{
  id:"q026", domain:"vision", type:"single",
  q:"Custom Vision で物体検出モデルを評価したところ、適合率(precision)は高いが再現率(recall)が低い。これが示す状態として正しいものはどれか。",
  choices:[
    { t:"検出した物体はほぼ正しいが、実在する物体の多くを見逃している", c:true, e:"高 precision＝検出(陽性)の多くが正解、低 recall＝実在する陽性の取りこぼしが多い、という意味。つまり『慎重すぎて拾い漏らしが多い』状態を正しく表す。" },
    { t:"多くの物体を検出するが、その大半が誤検出である", c:false, e:"本来これは『低 precision・高 recall』の説明(たくさん拾うが誤りも多い)。設問の高 precision・低 recall とは真逆の状態なので誤り。" },
    { t:"学習データが完全にラベル付けされている証拠である", c:false, e:"本来ラベル付けの質はメトリックに影響するが、precision/recall の値からラベルの『完全性』を断定はできない。指標の意味と論点がずれており誤り。" },
    { t:"mAP が必ず 1.0 であることを意味する", c:false, e:"本来 mAP は precision-recall 全体を平均した総合指標。recall が低い時点で完璧(1.0)にはならず、『必ず 1.0』は成り立たないため誤り。" }
  ],
  summary:"precision＝検出の正しさ、recall＝取りこぼしの少なさ。高 precision・低 recall＝『当てたものは正しいが見逃しが多い』。",
  keywords:[
    { k:"precision / recall / mAP", d:"precision=TP/(TP+FP)、recall=TP/(TP+FN)。mAP（mean Average Precision）は物体検出の総合指標。確率しきい値や重なり(overlap/IoU)しきい値を変えると precision/recall のバランスが動く。" },
    { k:"確率しきい値と重なりしきい値", d:"probability threshold を上げると誤検出は減るが見逃しが増える（precision↑ recall↓）。物体検出では IoU（overlap）しきい値で正解判定の重なり度合いを定義する。" }
  ]
},
{
  id:"q027", domain:"vision", type:"single",
  q:"Custom Vision で、1 枚の画像に『複数のタグが同時に当てはまり得る』分類器を作りたい（例: 1 枚に「海」と「夕日」の両方）。プロジェクト作成時の正しい選択はどれか。",
  choices:[
    { t:"分類（Classification）＋ 複数ラベル（Multilabel）", c:true, e:"1 画像に複数タグを許す場合は multilabel 分類を選ぶ。各タグを独立に(付く/付かないで)判定するため、『海』と『夕日』を同時に付与できる。" },
    { t:"分類（Classification）＋ 単一ラベル（Multiclass）", c:false, e:"本来 multiclass は相互排他で 1 画像に 1 タグだけを割り当てる方式。カテゴリが排他な問題には最適だが、複数タグ同時付与が要る本ケースには構造的に合わない。" },
    { t:"物体検出（Object Detection）", c:false, e:"本来 object detection は『どこに何があるか』の位置(バウンディング ボックス)まで求める用途。位置は不要で画像全体に複数タグを付けたい本ケースでは過剰で、目的が異なる。" },
    { t:"異常検出（Anomaly Detection）", c:false, e:"本来これは正常/異常を見分けるタスクの概念で、そもそも Custom Vision のプロジェクト種別として選べない。要件(複数タグ分類)とも無関係で誤り。" }
  ],
  summary:"複数タグ同時＝Multilabel 分類。1 画像 1 タグ＝Multiclass。位置が要る＝物体検出。",
  keywords:[
    { k:"Multiclass vs Multilabel", d:"Multiclass は相互排他（1 つだけ）。Multilabel は非排他（複数同時可）。要件に応じて作成時に選ぶ（後から変更不可）。" }
  ]
},
{
  id:"q028", domain:"vision", type:"single",
  q:"Custom Vision でトレーニングしたモデルを、運用アプリから推論呼び出しする。クライアントに設定すべき認証情報の組み合わせとして正しいものはどれか。",
  choices:[
    { t:"Prediction リソースのキーとエンドポイント、対象の発行済みイテレーション名（公開名）", c:true, e:"推論には Prediction リソースのキー/エンドポイントと、Publish 済みイテレーションの公開名が必要。学習用の Training とは別リソース・別キーである点が要点。" },
    { t:"Training リソースのキーとエンドポイント", c:false, e:"本来 Training キーはデータ アップロードや学習・イテレーション管理に使う。しかし推論(予測)の呼び出しには Prediction 側の認証が必要で、Training キーでは予測 API を呼べないため誤り。" },
    { t:"Azure OpenAI のキーとデプロイ名", c:false, e:"本来これは Azure OpenAI(GPT/DALL-E 等)を呼ぶための認証情報。Custom Vision とは別サービスであり、カスタム画像モデルの推論には全く関係しない。" },
    { t:"ストレージ アカウントの接続文字列", c:false, e:"本来これは Blob 等の保管領域へアクセスするための接続情報。学習画像の置き場に使うことはあっても、Custom Vision の推論を呼ぶ認証情報ではないため不適。" }
  ],
  summary:"Custom Vision は Training と Prediction の 2 リソースに分離。推論は Prediction キー＋発行済みイテレーション名。",
  keywords:[
    { k:"発行（Publish）と Prediction リソース", d:"学習後にイテレーションを Publish して初めて推論エンドポイントから利用可能になる。学習用 Training リソースと推論課金用 Prediction リソースは分離されており、キーも別。" }
  ]
},
{
  id:"q029", domain:"vision", type:"single",
  q:"録画済みの動画から、話者・顔・OCR・トピック・感情などの豊富なインサイトを抽出したい。最適なサービスはどれか。",
  choices:[
    { t:"Azure AI Video Indexer", c:true, e:"動画/音声から音声書き起こし・話者分離・顔/OCR/ブランド/トピック/感情など多面的インサイトを一括抽出する専用サービス。まさに本要件のためのもの。" },
    { t:"Azure AI Vision の空間分析（Spatial Analysis）", c:false, e:"本来 Spatial Analysis はカメラ映像内の人の存在・移動・滞留などをリアルタイムに検出する機能。ライブの空間イベント検出が目的で、録画動画からの総合インサイト抽出とは狙いが異なる。" },
    { t:"Custom Vision", c:false, e:"本来 Custom Vision は静止画の独自分類/物体検出を作るサービス。動画全体の書き起こしや話者/トピック/感情といった総合分析機能は持たないため不適。" },
    { t:"Document Intelligence", c:false, e:"本来 Document Intelligence は文書(請求書/フォーム等)からのフィールド抽出に特化。動画の解析とは対象メディアが異なり無関係。" }
  ],
  summary:"録画動画の総合インサイト＝Video Indexer。リアルタイムの人の存在/動線検出＝Spatial Analysis。",
  keywords:[
    { k:"空間分析（Spatial Analysis）", d:"Azure AI Vision の機能で、カメラ ストリーム内の人の入退室・カウント・距離・滞留などを検出。小売や安全監視向け。Video Indexer の事後インサイト抽出とは別物。" }
  ]
},
{
  id:"q030", domain:"vision", type:"single",
  q:"大量の複数ページ PDF や写真から印刷・手書きテキストを読み取る。Azure AI Vision の Read（OCR）API の特性として正しいものはどれか。",
  choices:[
    { t:"大きな/複数ページの文書は非同期で処理し、結果を別途取得する（操作の場所をポーリング）", c:true, e:"Read は大容量/複数ページを非同期実行し、開始→結果ポーリングの流れで行/単語/ページと境界座標を返す。手書きにも対応する。これが正しい特性。" },
    { t:"常に同期 1 回の呼び出しで全結果を即返す", c:false, e:"本来小さな画像は同期呼び出しもあり得る。しかし大規模/複数ページ文書は非同期が前提で、処理完了を待って結果を取得する。『常に同期即返し』は仕様に反し誤り。" },
    { t:"手書きテキストには対応していない", c:false, e:"本来 Read は印刷文字だけでなく手書き文字の認識にも対応する高精度 OCR。『手書き非対応』は事実に反するため誤り。" },
    { t:"テキストの位置（境界座標）は返さない", c:false, e:"本来 Read は行・単語ごとに境界ボックス/ポリゴンの座標を返す(レイアウト用途で重要)。『座標を返さない』は誤り。" }
  ],
  summary:"Read は印刷＋手書き対応、行/単語/ページと座標を返し、大規模文書は非同期（開始→結果取得）で処理。",
  keywords:[
    { k:"Read（OCR）API", d:"高精度 OCR。同期/非同期があり、複数ページ文書は非同期で実行し結果を取りに行く。返却は pages>lines>words 階層＋境界座標。Document Intelligence の read モデルとも連携。" }
  ]
}

];
