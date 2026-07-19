/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ9 (q191-q210)
 *  出典: Udemy掲載のAI-103対策講座（ユーザー提供の20問を再構成）。
 *  source:"Udemy AI-103" を付与。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q191", domain:"plan", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある開発者が、新規プロジェクトを作成して Azure OpenAI モデルをデプロイするために Microsoft Foundry ポータルにアクセスする必要があります。どの URL に移動すべきですか？",
  choices:[
    { t:"ai.azure.com", c:true, e:"Microsoft Foundry ポータルは ai.azure.com にホストされており、プロジェクト作成・接続作成・デプロイ管理・評価実行を統一的な体験で提供する。" },
    { t:"portal.azure.com", c:false, e:"本来これは Azure リソース全般(VM/ストレージ/リソース グループ等)を扱う一般的な Azure ポータルの URL。Foundry 専用のプロジェクト作成/モデル デプロイ体験は提供せず、本要件には合わない。" },
    { t:"ml.azure.com", c:false, e:"本来これは機械学習ワークロード向けの Azure Machine Learning Studio の URL。Foundry のモデル カタログやプロジェクト管理とは別の製品体験であり、本要件のFoundryポータルではない。" },
    { t:"studio.azureml.ms", c:false, e:"本来これは旧世代の Azure Machine Learning Studio (classic) で使われていたURL。現行のFoundryポータルとは無関係の廃止済み製品を指す。" }
  ],
  summary:"Microsoft Foundry ポータル＝ai.azure.com。Azure全般管理=portal.azure.com、AML Studio=ml.azure.com、旧classic=studio.azureml.msと区別する。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"Foundryポータルの位置づけ。" }
  ]
},
{
  id:"q192", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある企業のソリューション アーキテクトが、大量のスキャン済み請求書を処理する金融アプリケーション向けに Azure AI サービスを選定しています。チームはカスタム OCR パイプラインを構築せずに構造化されたフィールド抽出を実現したいと考えています。最も適切なサービスはどれですか？",
  choices:[
    { t:"Foundry Tools の Azure Document Intelligence", c:true, e:"Azure Document Intelligence は事前構築済みの Invoice(請求書)モデルを提供し、ベンダー名・請求書日付・支払期日・明細項目・小計・税額・合計をカスタム パイプライン不要で抽出できる。まさに本要件のためのサービス。" },
    { t:"read 機能付きの Azure Vision Image Analysis 4.0", c:false, e:"本来これは画像から文字を抽出する OCR 機能。テキストは取れるが、『これは合計』『これは支払期日』といった請求書特有の構造化フィールド抽出は提供せず、カスタム開発が別途必要になるため本要件に不足する。" },
    { t:"Azure AI Language の NER タスク", c:false, e:"本来 NER(固有表現認識)はテキストに対して人名/組織名などの型付きエンティティを抽出する機能。事前にテキスト化(OCR)されていることが前提で、しかも請求書特有の構造化フィールド(合計・税額等)を返す設計ではないため不足する。" },
    { t:"カスタム スキーマ付きの Azure AI Content Understanding", c:false, e:"本来これは柔軟なマルチモーダル抽出ができる有効な代替手段ではある。しかし請求書用の事前構築済みモデルが既に存在するため、カスタム スキーマを一から設計するのは不要な複雑性を加えることになり、最も適切とは言えない。" }
  ],
  summary:"請求書のカスタム不要な構造化抽出＝Document Intelligenceのprebuilt Invoiceモデル。OCR単体・NER・Content Understandingはいずれも本要件には過不足がある。",
  keywords:[
    { k:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", d:"prebuilt Invoiceモデルの位置づけ。" }
  ]
},
{
  id:"q193", domain:"plan", type:"single", source:"Udemy AI-103", mono:true,
  q:"あるチームが Azure CLI を使用して Microsoft Foundry ハブを作成しています。ハブを正しく作成する CLI コマンド構文はどれですか？",
  choices:[
    { t:"az ml workspace create --kind hub", c:true, e:"Foundry ハブの実体は Microsoft.MachineLearningServices/workspaces（Azure Machine Learning ワークスペース）で、kind が Hub に設定されたもの。そのため正しい CLI コマンドは az ml workspace create --kind hub になる。" },
    { t:"az ai foundry create --kind hub", c:false, e:"本来 az ai という名前のコマンド グループは Azure CLI に存在しない。Foundry ハブの基盤リソース型は Machine Learning ワークスペースであるため、実在しないコマンド構文であり動作しない。" },
    { t:"az cognitiveservices account create --kind hub", c:false, e:"本来このコマンドはスタンドアロンの Azure AI Cognitive Services アカウント(単一/マルチサービス リソース)を作成するためのもの。Foundryハブ(MLワークスペース系)とはリソースの種類が異なり、hubというkindも受け付けない。" },
    { t:"az openai create --workspace-kind hub", c:false, e:"本来 az openai という有効なAzure CLIコマンドは存在しない。存在しないコマンドとパラメーターの組み合わせであり誤り。" }
  ],
  summary:"Foundryハブの実体はMLワークスペース(kind=Hub)。正しいCLIはaz ml workspace create --kind hub。az ai foundry/az openaiのような専用コマンドは存在しない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"az ml workspace createでの作成。" }
  ]
},
{
  id:"q194", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"ある企業が、1日あたり一定して500万トークンを処理する本番 Azure OpenAI デプロイ向けに、予測可能なスループットを必要としています。どのデプロイ種別を選ぶべきで、主なコストへの影響は何ですか？",
  choices:[
    { t:"プロビジョニング済みスループット ユニット（PTU）。利用状況に関わらず時間単位で課金", c:true, e:"PTUデプロイは分あたりトークン数で測定されるモデル容量を予約し、スロットリングのばらつきを排除する。実際のトークン消費量に関わらず固定の時間料金で課金され、安定した本番負荷に対する予測可能なスループットという本要件に合致する。" },
    { t:"サーバーレス API デプロイ。消費トークン数に応じて課金", c:false, e:"本来サーバーレス(Standard)デプロイは変動的または小規模なワークロードには適した従量課金形態。しかしスループットが保証されないため、『一定して大量かつ予測可能』という本要件の“予測可能性”の観点では不十分。" },
    { t:"マネージド オンライン エンドポイント。推論コール1件ごとに課金", c:false, e:"本来これは Azure Machine Learning のカスタム コンテナー ホスティング向けの仕組みであり、Azure OpenAI 専用のデプロイ形態ではない。本要件（Azure OpenAIの本番デプロイ）の選択肢としてはそもそも対象が異なる。" },
    { t:"グローバル スタンダード デプロイ。自動ロードバランシングを伴いリクエスト1件ごとに課金", c:false, e:"本来グローバル スタンダードは世界中の空き容量へ動的ルーティングしてスループット/コストで有利になる形態だが、これはレイテンシに影響するルーティング戦略であって、スループットを“専用予約”するものではないため、予測可能性を最優先する本要件には PTU ほど適さない。" }
  ],
  summary:"安定した大量トラフィックへの予測可能なスループット＝PTU（利用状況に関わらず時間単位課金）。Standard/マネージドオンライン/グローバルスタンダードはいずれも専用予約ではない。",
  keywords:[
    { k:"デプロイ形態（Standard / Global / Batch / Provisioned=PTU）と TPM", d:"PTUの課金特性。" }
  ]
},
{
  id:"q195", domain:"plan", type:"multi", source:"Udemy AI-103",
  q:"あるセキュリティ管理者が、本番運用の Foundry プロジェクトでアプリケーション コードの認証を構成する際、Microsoft 推奨のベスト プラクティスに従う必要があります。どの2つのアクションを取るべきですか？",
  choices:[
    { t:"API キーの代わりにマネージド ID 認証を使用する", c:true, e:"Foundry リソースにアクセスするアプリケーション コードの認証メカニズムとして、Microsoft はマネージド ID の利用を推奨している。" },
    { t:"ハブのマネージド ID に、リンクされたストレージ アカウント上で Storage Blob データ共同作成者ロールを付与する", c:true, e:"ハブのマネージド IDが、リンクされた Azure Storage アカウントにアクセスするためには、Storage Blob データ共同作成者ロールの付与が必要になる。" },
    { t:"アプリケーション設定ファイルに API キーを直接埋め込んで高速にアクセスできるようにする", c:false, e:"本来これは設定ファイルに秘密情報をそのまま書き込むアンチパターン。ソース管理やログへの混入等で漏えいするリスクが高く、明確にセキュリティ推奨に反する。" },
    { t:"Azure Key Vault に API キーを保存し、手動スクリプトで毎週ローテーションする", c:false, e:"本来これは設定ファイルへの直接埋め込みよりは改善されているが、依然としてキーという“漏えいし得る秘密情報”に依存し、手動ローテーションの運用負荷も残る。マネージド ID 認証（キー自体が不要になる方式）の方がより望ましい。" },
    { t:"ハブを構成してパブリック ネットワーク アクセスを無効化し、すべてのトラフィックをプライベート エンドポイント経由でルーティングする", c:false, e:"本来これはネットワーク分離としては有効な施策だが、問われているのは“認証”のベスト プラクティスであり、これは“ネットワーク セキュリティ”の制御にあたるため、本設問の観点（認証）の答えとしては不適切。" }
  ],
  summary:"認証のベストプラクティス＝①APIキーの代わりにマネージドID認証 ②ハブのマネージドIDにStorage Blobデータ共同作成者ロールを付与。ネットワーク分離は別軸の対策。",
  keywords:[
    { k:"Foundry のロールベース アクセス制御（Azure AI Developer / Inference Deployment Operator / ハブレベル vs プロジェクトレベル）", d:"マネージドID認証の推奨と必要ロール。" }
  ]
},
{
  id:"q196", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある Foundry プロジェクトの開発者が、モデルのデプロイと評価の実行はできるが、ハブレベルの設定変更や他ユーザーへのロール割り当てはできないようにする必要があります。どの組み込みロールを割り当てるべきですか？",
  choices:[
    { t:"プロジェクトレベルの Azure AI Developer", c:true, e:"Azure AI Developer ロールは、ハブレベルの管理者権限を伴わずに、プロジェクトレベルでデプロイの作成・評価実行・コンピュート管理・接続の読み取りを行える。本要件（デプロイ/評価はできるが管理はできない）に過不足なく合致する。" },
    { t:"ハブレベルの所有者（Owner）", c:false, e:"本来 Owner はロール割り当てを含む完全な制御権を付与するロール。本要件は『他ユーザーへのロール割り当てはできない』ことを求めており、必要権限を大きく超えるため不適切。" },
    { t:"ハブレベルの共同作成者（Contributor）", c:false, e:"本来 Contributor はハブレベルでのリソース変更（設定変更を含む）を許可するロール。本要件は『ハブレベルの設定変更はできない』ことを求めており、これも必要以上に広範な権限になる。" },
    { t:"プロジェクトレベルの Azure AI Inference Deployment Operator", c:false, e:"本来このロールはモデル デプロイの作成と削除のみを対象とする限定的なロール。デプロイはできても“評価の実行”までは権限に含まれず、本要件の一部（評価も実行できる）を満たせない。" }
  ],
  summary:"デプロイ+評価はできるがハブ管理・ロール割当は不可＝プロジェクトレベルのAzure AI Developer。Owner/Contributorは過剰、Inference Deployment Operatorは評価権限が不足。",
  keywords:[
    { k:"Foundry のロールベース アクセス制御（Azure AI Developer / Inference Deployment Operator / ハブレベル vs プロジェクトレベル）", d:"各ロールの権限範囲。" }
  ]
},
{
  id:"q197", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるプラットフォーム チームが GPT-4o の PTU デプロイを保有しており、利用率が継続的に90%を超えた場合にアラートを受け取りたいと考えています。Azure Monitor のどのメトリクスをアラートのトリガーに設定すべきですか？",
  choices:[
    { t:"PTU 利用率パーセンテージ", c:true, e:"PTU 利用率パーセンテージは予約容量の消費を直接示すメトリクス。90%を持続的に超える値はオーバーフロー（スロットリング発生）が起こり得ることを先読みで示すため、本要件のアラート トリガーに最も直接的。" },
    { t:"リクエスト レイテンシ P99", c:false, e:"本来これは応答速度を測定する指標。負荷が高まると上昇する“可能性”はあるが、プロビジョニング済み容量の利用率そのものを直接反映するわけではなく、利用率の先読み監視には間接的すぎる。" },
    { t:"スロットリング済みリクエスト数", c:false, e:"本来これはPTU上限を“既に超えて拒否された後”のリクエスト数を示す遅行指標。90%到達時点で事前に気づきたいという本要件には遅すぎる（問題が起きてから分かる指標）。" },
    { t:"完了トークン消費レート", c:false, e:"本来これは実際のトークン消費量そのものを追跡する指標であり、予約容量に対する比較（割合としての利用率）を直接示すものではないため、本要件のアラート指標としては不十分。" }
  ],
  summary:"PTUの容量逼迫を先読みで検知＝PTU利用率パーセンテージ。レイテンシは間接的、スロットリング数は遅行指標、トークン消費レートは絶対量であり割合ではない。",
  keywords:[
    { k:"PTU デプロイの監視メトリクスと分散トレーシング環境変数", d:"PTU利用率と他指標の違い。" }
  ]
},
{
  id:"q198", domain:"genai", type:"single", source:"Udemy AI-103", mono:true,
  q:"あるチームが prompt flow パイプラインで分散トレーシングを有効にし、各ノードのレイテンシを観測ツール上のスパンとして表示したいと考えています。アプリケーションでどの環境変数を設定する必要がありますか？",
  choices:[
    { t:"APPLICATIONINSIGHTS_CONNECTION_STRING", c:true, e:"azure.ai.inference のトレーシング モジュールは、この環境変数が設定されている際に OpenTelemetry 互換のスパンを自動的に発行する。各ノードのレイテンシを観測ツールへ送る本要件に直接対応する。" },
    { t:"AZURE_MONITOR_CONNECTION_STRING", c:false, e:"本来これはFoundry SDKでApplication Insightsトレースを有効化するための、ドキュメント化された環境変数ではない。名称が似ているが実際に参照される変数名とは異なる。" },
    { t:"AZURE_AI_TRACING_ENDPOINT", c:false, e:"本来この名前の環境変数もこの目的ではドキュメント化されていない。もっともらしい名称だが、実際にazure.ai.inferenceが参照するキーではない。" },
    { t:"OPENTELEMETRY_EXPORTER_URL", c:false, e:"本来これは一般的なOpenTelemetryの概念を想起させる名称だが、Foundryのトレーシング モジュールが実際に参照する変数ではない。" }
  ],
  summary:"分散トレーシングの有効化キーはAPPLICATIONINSIGHTS_CONNECTION_STRING。似た名称の他の変数は実際には参照されない。",
  keywords:[
    { k:"PTU デプロイの監視メトリクスと分散トレーシング環境変数", d:"トレーシング用環境変数。" }
  ]
},
{
  id:"q199", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"Azure OpenAI と RAG を活用するチャットボットが Web から文書を取得して応答に組み込みます。セキュリティ チームは、取得した Web 文書に埋め込まれた悪意ある指示がシステム プロンプトを上書きしようとする攻撃を検知したいと考えています。どの Azure AI Content Safety 機能がこれに対応しますか？",
  choices:[
    { t:"プロンプト シールドによる間接プロンプト インジェクション検出", c:true, e:"間接プロンプト インジェクションは、RAGで取得された文書やWebページに悪意ある指示が埋め込まれている際に発生するもの。プロンプト シールドはこのベクトル（外部コンテンツ経由の攻撃）を特に検出する機能を持つ。" },
    { t:"グラウンディング検出（Groundedness detection）", c:false, e:"本来これはモデルの応答が提供された文脈(接地文書)によって裏付けられているかを検証する機能——いわゆる幻覚(ハルシネーション)対策。取得文書に埋め込まれた攻撃的な“指示”そのものを検知する機能ではないため、本要件には合わない。" },
    { t:"保護対象素材の検出（Protected material detection）", c:false, e:"本来これは著作権で保護された素材をモデルが再現していないかを検出する機能。プロンプト インジェクションの検知とは目的も対象も異なり、本シナリオには無関係。" },
    { t:"プロンプト シールドによる直接プロンプト インジェクション検出", c:false, e:"本来これはユーザー自身の入力がシステム プロンプトを直接上書きしようとするケース(ジェイルブレイク)に対応する機能。本問は“外部から取得したWeb文書”に埋め込まれた攻撃であり、ユーザー入力そのものではないため、直接ではなく間接インジェクション検出の方が対応する。" }
  ],
  summary:"外部取得文書に埋め込まれた攻撃＝間接プロンプトインジェクション検出。ユーザー入力からの直接攻撃とは区別する。グラウンディング検出・保護素材検出とは目的が異なる。",
  keywords:[
    { k:"Content Safety の危害カテゴリ と 別機能（Prompt Shields / グラウンド検出 / 保護素材検出）", d:"直接/間接インジェクションの違い。" }
  ]
},
{
  id:"q200", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるコンテンツ モデレーション チームが Azure OpenAI デプロイにカスタム コンテンツ フィルタ ポリシーを構成しています。彼らは『sharp blade（鋭い刃）』のような表現を含む製品説明で Violence（暴力）カテゴリがトリガーされていることに気づきました。本当に有害な暴力表現はブロックしつつ、こうしたコンテンツを許可したい場合、何を調整すべきですか？",
  choices:[
    { t:"カスタム フィルタ ポリシーで Violence カテゴリの重大度しきい値を上げる", c:true, e:"コンテンツ フィルタの各カテゴリは0〜7の重大度スケールで判定される。しきい値を上げることで、付随的な製品表現のような低重大度のマッチは許容しつつ、高重大度の暴力表現は引き続きブロックできる。" },
    { t:"フィルタ ポリシーで Violence カテゴリ全体を完全に無効化する", c:false, e:"本来カテゴリ全体を無効化すると、低重大度の誤検知だけでなく“本当に有害な高重大度の暴力表現”まで検出されなくなってしまう。安全性を大きく損なうため、選択的な調整（しきい値変更）の方が適切。" },
    { t:"カスタム ポリシーから既定ポリシーに切り替える", c:false, e:"本来既定ポリシーはカスタム設定より一般的な基準で判定するため、同じ製品表現でも依然としてトリガーされる可能性が高く、問題の解決にはならない。" },
    { t:"文脈を検証するためにグラウンディング検出を有効化する", c:false, e:"本来グラウンディング検出は応答が接地文書に基づいているか（幻覚でないか）を確認する機能であり、コンテンツ モデレーションの重大度しきい値の調整とは全く別の目的の機能。" }
  ],
  summary:"誤検知を減らしつつ本当に有害な内容はブロック＝該当カテゴリの重大度しきい値を調整。カテゴリ無効化・既定ポリシーへの切替・グラウンディング検出はいずれも不適切。",
  keywords:[
    { k:"Content Safety の危害カテゴリ と 別機能（Prompt Shields / グラウンド検出 / 保護素材検出）", d:"重大度しきい値の調整。" }
  ]
},
{
  id:"q201", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"あるデータ サイエンティストが、Azure Blob Storage に保存された50,000件のPDFファイルに対して、カスタム Document Intelligence パイプラインを使用して夜間文書処理を実行したいと考えています。非同期実行とコスト効率を求めています。Foundryではどのデプロイ種別が最適ですか？",
  choices:[
    { t:"コンピュート クラスター上で実行されるバッチ エンドポイント", c:true, e:"バッチ エンドポイントは大規模推論を非同期に実行し、Azure Blob Storageからの入力ファイルを処理して出力をストレージに書き戻す。大規模文書集合に対する夜間処理という本要件にまさに設計された仕組み。" },
    { t:"最小インスタンス数1のマネージド オンライン エンドポイント", c:false, e:"本来これはリアルタイムの同期推論リクエスト向けに設計された仕組み。常時インスタンスを起動しておく必要があり、アイドル期間が生じる夜間バッチ処理ではコスト効率が悪く本要件に合わない。" },
    { t:"HTTPトリガー付き Azure Container Apps", c:false, e:"本来これは汎用的なマイクロサービス ホスティングのオプションであり、Foundryのバッチ処理パターンとネイティブ統合されていない。自前でオーケストレーションを組む必要が生じ、本要件の最適解ではない。" },
    { t:"Document Intelligence のサーバーレス API デプロイ", c:false, e:"本来これはコール単位で課金されるAPIアクセスの形態。50,000件規模のバッチをまとめて非同期処理するオーケストレーションの仕組みは持たず、本要件（大規模・非同期・コスト効率）には適さない。" }
  ],
  summary:"大量文書の夜間非同期処理＝コンピュートクラスター上のバッチエンドポイント。オンラインエンドポイント/汎用コンテナー/サーバーレスAPIはいずれも目的が異なる。",
  keywords:[
    { k:"大規模バッチ処理向けエンドポイント種別（バッチ エンドポイント vs マネージド オンライン エンドポイント vs サーバーレスAPI）", d:"夜間バッチ処理に適した選択。" }
  ]
},
{
  id:"q202", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある組織がマネージド VNet 分離付きの Foundry ハブを作成し、その後、特定のプライベート FQDN にある内部 REST API にハブのマネージド VNet からアクセスを許可する必要があると判明しました。管理者はどう構成すべきですか？",
  choices:[
    { t:"マネージド VNet 構成にターゲット FQDN を指定したカスタム アウトバウンド ルールを追加する", c:true, e:"マネージド VNet 分離は、FQDN・サービス タグ・プライベート エンドポイントのタイプのカスタム アウトバウンド ルールをサポートしている。これが内部サービスへのアクセスを追加するための文書化された正しい仕組み。" },
    { t:"ハブの分離モードをマネージド VNet からカスタマー マネージド VNet 付きの Private に変更する", c:false, e:"本来『カスタマー マネージド VNet 付きの Private』というモードは、マネージド VNet の分離モード(Public / Private with Internet Outbound / Private with Approved Outbound)には存在しない。また既存ハブのネットワーク構成変更は全コンピューティング リソースの削除が前提となる大掛かりな操作であり、本要件（特定FQDNへのアクセス追加）には不適切。" },
    { t:"同じリージョンに新しいハブを作成し、2つのハブの仮想ネットワークをピアリングする", c:false, e:"本来Foundryのマネージド VNetは、顧客が主導する直接的なVNetピアリングをサポートしていない。新しいハブを作ってピアリングするという方法自体が成立しない無効な操作。" },
    { t:"ハブのリソース グループにリンクされた Azure Private DNS ゾーンに FQDN を追加する", c:false, e:"本来Private DNSゾーンへのFQDN追加は“名前解決”を制御するものであり、ネットワークの“到達可否(アクセス許可)”そのものを付与するものではない。名前が引けてもアウトバウンド ルールで許可されていなければ到達できない。" }
  ],
  summary:"マネージドVNetから特定FQDNへのアクセス許可＝カスタムアウトバウンドルールの追加。分離モード変更・新規ハブ+ピアリング・DNSゾーン追加はいずれも代替にならない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"マネージドVNetのカスタムアウトバウンドルール。" }
  ]
},
{
  id:"q203", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるハブ管理者がハブ作成時にカスタマー マネージド キー（CMK）暗号化を有効にしました。6か月後、コンプライアンス担当者が Azure Key Vault で CMK キーを失効させました。このハブへの即時の影響は何ですか？",
  choices:[
    { t:"ハブ内のすべての暗号化データへのアクセスが事実上ロックされる", c:true, e:"CMKキーの失効により、ハブのマネージド IDは保存データの復号に必要なキー アンラップ操作を実行できなくなる。CMK暗号化はトレーニング データ・モデル成果物・実験メタデータを含む保存データすべてに適用されるため、影響はハブ全体に及ぶ。" },
    { t:"Azure は暗号化キーを24時間キャッシュするため、ハブは引き続き機能する", c:false, e:"本来、失効後もアクセスを維持できるような『24時間キャッシュ保証』はCMKの仕組みとして存在しない。この説明は実在しない猶予機能を前提としており誤り。" },
    { t:"新しいモデル デプロイはブロックされるが、既存デプロイは推論を続ける", c:false, e:"本来CMK暗号化は保存データ全体に及ぶため、キーが失効すると新規デプロイだけでなく既存の暗号化データへのアクセスも含めて影響を受ける。『既存デプロイだけは無事』という限定的な説明は誤り。" },
    { t:"ハブのマネージド IDが自動的に Microsoft マネージド キーにフォールバックする", c:false, e:"本来CMKを利用している場合、Microsoftマネージドキーへの自動フォールバックという仕組みは存在しない。失効した時点でアクセスがロックされるのであって、代替キーに自動的に切り替わるわけではない。" }
  ],
  summary:"CMKキー失効＝ハブ内の暗号化データ全体へのアクセスが事実上ロックされる（自動フォールバックやキャッシュ猶予はない）。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"CMK暗号化失効の影響範囲。" }
  ]
},
{
  id:"q204", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある企業が1つの Foundry ハブを3つの製品チームで共有しつつ、各チームのコンピュート ターゲットとデプロイは分離して保ちたいと考えています。正しいアーキテクチャ アプローチはどれですか？",
  choices:[
    { t:"1つのハブに3つのプロジェクトを作成し、チームごとに別々のロール割り当てを行う", c:true, e:"プロジェクトはハブのストレージとKey Vaultを継承する子リソースだが、コンピュート ターゲット・デプロイ・実験追跡は別個に維持される。ハブの所有者は各プロジェクトをスコープとしてロールを独立に割り当てられるため、共有と分離を両立できる。" },
    { t:"共通のストレージ アカウントにリンクされた、チームごとに3つの個別ハブを作成する", c:false, e:"本来これは完全な分離を実現する一方で、ハブという“共有インフラ”自体をチーム間で共有しないため、1つのハブを共有するという本来の目的（コスト集約・一元管理などのガバナンス上の利点）を打ち消してしまう。" },
    { t:"1つのハブを作成し、デプロイ名のプレフィックスでチームのリソースを論理的に分離する", c:false, e:"本来命名規則(プレフィックス)は見た目の整理にはなるが、アクセス制御(誰が何にアクセスできるか)を実際に分離する仕組みではないため、真の分離が必要な本要件を満たさない。" },
    { t:"1つのハブを作成し、チームごとに3つの個別 Key Vault インスタンスを構成する", c:false, e:"本来ハブには共有のKey Vaultが1つ紐づく設計であり、プロジェクトごとに別のKey Vaultを割り当てるという構成は誤った前提に基づいている。" }
  ],
  summary:"1ハブ共有+チーム分離＝1つのハブに複数プロジェクトを作りプロジェクト単位でロール割当。別ハブ乱立・命名規則のみ・個別KeyVaultはいずれも不適切。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"複数チームでの共有アーキテクチャ。" }
  ]
},
{
  id:"q205", domain:"plan", type:"multi", source:"Udemy AI-103",
  q:"あるガバナンス チームが Foundry 環境で責任ある AI のプラクティスを実装しています。次のうち、Foundryの責任あるAIガバナンス フレームワークの一部はどの3つですか？",
  choices:[
    { t:"非準拠モデルのデプロイを防ぐために Azure Policy を使用する", c:true, e:"Azure Policyはコンプライアンス違反のモデルのデプロイ防止など、組織のルールを強制するガバナンス制御を提供する。" },
    { t:"データ入力を分類するために Microsoft Purview Information Protection ラベルを適用する", c:true, e:"Microsoft Purview Information Protectionラベルは、機微なデータ入力を分類・保護する責任あるAIガバナンスの一部として使われる。" },
    { t:"azure.ai.evaluation SDK を使ってモデル出力の一貫性、流暢性、グラウンディング性を評価する", c:true, e:"azure.ai.evaluation SDKは一貫性・流暢性・グラウンディング性などの品質メトリクス向けの組み込み評価機能を提供し、責任あるAIの品質検証を支える。" },
    { t:"高可用性のために Foundry ハブ間でネットワーク ピアリングを構成する", c:false, e:"本来これはインフラの可用性を高めるためのネットワーク アーキテクチャの課題であり、モデルの公平性・安全性・品質などを扱う責任あるAIガバナンスの施策とは領域が異なる。" },
    { t:"レイテンシ削減のため推論エンドポイントで自動 GPU スケーリングを有効化する", c:false, e:"本来これはパフォーマンス/インフラ最適化の課題であり、責任あるAIガバナンス（公平性・安全性・透明性等の担保）の施策には含まれない。" }
  ],
  summary:"責任あるAIガバナンスの実装＝Azure Policy(強制)＋Purview(データ分類保護)＋azure.ai.evaluation SDK(品質評価)。可用性/パフォーマンス最適化は別領域。",
  keywords:[
    { k:"責任ある AI ガバナンスの具体的な実装手段（Azure Policy / Purview / azure.ai.evaluation）", d:"3つの具体的手段。" }
  ]
},
{
  id:"q206", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある開発者が新しい Microsoft Foundry プロジェクトを作成してモデルをデプロイしています。次の手順の正しい順序はどれですか。",
  choices:[
    { t:"ストレージとKey Vault付きのFoundryハブを作成 → ハブの子リソースとしてプロジェクトを作成 → 依存Azureサービス(Azure AI Search等)への接続を構成 → モデルカタログからモデルをプロジェクトにデプロイ", c:true, e:"ハブは共有インフラを提供する最上位の親なので最初に作成する。プロジェクトはハブを必要とする子リソース、接続はプロジェクト レベルで構成し、モデル デプロイは最後にプロジェクトの接続とコンピュートを参照して作成する、という依存関係の順序が正しい。" },
    { t:"ハブの子リソースとしてプロジェクトを作成 → 続いてそのプロジェクトを束ねるFoundryハブをストレージとKey Vault付きで作成 → 依存サービスへの接続を構成 → モデルをデプロイ", c:false, e:"本来プロジェクトは“ハブの子リソース”として定義されるため、親であるハブが存在する前にはプロジェクトを作成できない。手順の依存関係が逆転しており成立しない。" },
    { t:"Foundryハブを作成 → 先にモデルカタログから基盤モデルをデプロイしてエンドポイントを確保 → そのデプロイを束ねるハブの子としてプロジェクトを作成 → 依存Azureサービスへの接続を構成", c:false, e:"本来モデルのデプロイは、それが所属するプロジェクトと、プロジェクトが参照する接続が存在して初めて行える操作。プロジェクトより先にデプロイを行うという順序は依存関係上成立しない。" },
    { t:"依存Azureサービスへの接続を先に構成 → その接続を取り込む形でFoundryハブを作成 → ハブの子としてプロジェクトを作成 → モデルをデプロイ", c:false, e:"本来接続はプロジェクト レベルで構成するものであり、接続を構成する時点でハブとプロジェクトが先に存在している必要がある。ハブより先に接続を作るという順序は成立しない。" }
  ],
  summary:"正しい順序＝ハブ作成(親)→プロジェクト作成(子)→プロジェクトで接続を構成→モデルをデプロイ。依存関係が逆転する選択肢はすべて成立しない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"ハブ→プロジェクト→接続→デプロイの順序。" }
  ]
},
{
  id:"q207", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるFinOpsエンジニアが、1つのハブを共有する複数の製品チームにFoundryのトークン コストを割り当てたいと考えています。各チームは独自のプロジェクトを持っています。推奨されるコスト割り当ての仕組みは何ですか？",
  choices:[
    { t:"各プロジェクトに Azure リソース タグを適用し、Azure Cost Management でのコスト割り当て追跡を有効化する", c:true, e:"マルチプロジェクト型のハブでは、プロジェクトにタグを適用し、Azure Cost Managementでチーム別にコスト割り当てを行うのが文書化された推奨方法。" },
    { t:"チームごとに完全に別々のAzureサブスクリプションを作成し、それぞれに独立したハブと専用の請求スコープをデプロイして物理的に分離する", c:false, e:"本来これは共有ハブの利点(コスト集約・一元管理)を打ち消してしまう大掛かりな構成であり、単なるコスト割り当てという要件に対しては明らかに大げさで不適切。" },
    { t:"デプロイ レベルの命名規則だけを使用して請求エクスポートCSVをダウンロードし、各チームの利用分を手動でパースして表計算で集計する運用にする", c:false, e:"本来これは自動化された仕組みではなく手動作業に依存するため、エラーが起きやすく、規模が大きくなるほど運用負荷が増大し推奨されない。" },
    { t:"コスト区分を分離するためにチームごとに個別のAzure Key Vaultインスタンスを構成し、シークレット アクセス ログから利用量を算出して按分する", c:false, e:"本来Key Vaultは暗号化とシークレット管理に関連するサービスであり、コスト割り当てや利用量の追跡を目的とした仕組みではない。目的が根本的に異なる。" }
  ],
  summary:"複数チームでのコスト割り当て＝プロジェクトへのリソースタグ付与＋Azure Cost Managementでの追跡。別サブスク乱立・手動集計・KeyVault分離はいずれも不適切。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"コスト配分の推奨方法。" }
  ]
},
{
  id:"q208", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある製品チームが、現在 Microsoft Foundry と呼ばれているプラットフォームの旧称について尋ねています。以前の名称は何でしたか？",
  choices:[
    { t:"Azure AI Foundry", c:true, e:"Microsoft Foundryの旧称はAzure AI Foundryであり、このリブランディングはAI-103試験ドキュメントにも明示されている。" },
    { t:"Azure Machine Learning Studio", c:false, e:"本来これは全く別の製品であるAzure Machine Learning Studioを指す名称。Foundryの旧称ではなく、現在も並行して存在する別サービス。" },
    { t:"Azure Cognitive Services Hub", c:false, e:"本来この名称のAzure製品は実在しない。もっともらしい名前を組み合わせた誤りの選択肢。" },
    { t:"Azure OpenAI Studio", c:false, e:"本来これはAzure OpenAI Studioという実在する別のポータルを指す名称であり、現在はMicrosoft Foundryポータルに統合されている。ただしこれ自体がFoundryの旧称というわけではない。" }
  ],
  summary:"Microsoft Foundryの旧称＝Azure AI Foundry。AML StudioやAzure OpenAI Studioは別の(あるいは統合された)製品で、旧称そのものではない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"旧称Azure AI Foundry。" }
  ]
},
{
  id:"q209", domain:"genai", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある Python 開発者が、Foundry プロジェクトのモデル デプロイとエージェント クライアントにプログラムからアクセスしたいと考えています。どのパッケージとクラスを使うべきですか？",
  choices:[
    { t:"azure-ai-projects, AIProjectClient", c:true, e:"azure-ai-projectsパッケージは、Foundryプロジェクトとやり取りするためのAIProjectClientクラスを提供する。モデルデプロイやエージェント クライアントへのプログラムからのアクセスという本要件に直接対応する。" },
    { t:"azure-ai-inference, ChatCompletionsClient", c:false, e:"本来これはFoundryプロジェクト層を介さず“直接”モデル推論を行うためのパッケージ/クラス。エージェントや接続などプロジェクト レベルの資産にはアクセスできず、本要件（プロジェクトへのアクセス）には不足する。" },
    { t:"azure-openai, AzureOpenAI", c:false, e:"本来これはOpenAI APIを直接呼び出すためのAzure OpenAI Python ライブラリであり、Foundryプロジェクト層(エージェント等)にアクセスするための仕組みではない。" },
    { t:"azure-ml-sdk, MLClient", c:false, e:"本来これは機械学習ワークロード向けのAzure ML SDKであり、Foundry projects APIとは別のパッケージ体系。エージェント クライアントへのアクセスは提供しない。" }
  ],
  summary:"Foundryプロジェクト(モデルデプロイ/エージェント)へのプログラムアクセス＝azure-ai-projectsパッケージのAIProjectClient。azure-ai-inference/azure-openai/azure-ml-sdkはいずれも別レイヤー。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"AIProjectClientの役割。" }
  ]
},
{
  id:"q210", domain:"genai", type:"multi", source:"Udemy AI-103", mono:true,
  q:"ある開発者が Foundry プロジェクトとやり取りするために Python の AIProjectClient を構成しています。AIProjectClient に関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"AIProjectClient は、プロジェクト エンドポイント URL と DefaultAzureCredential などの資格情報を使って初期化する", c:true, e:"AIProjectClientはプロジェクト エンドポイントURLとDefaultAzureCredentialなどの資格情報で初期化され、後続の呼び出し(モデル/エージェント等へのアクセス)を可能にする。" },
    { t:"プロジェクト エンドポイント URL の形式は https://<ai-services-account-name>.services.ai.azure.com/api/projects/<project-name> である", c:true, e:"プロジェクト エンドポイントURLはこの形式に従う。これはFoundryポータルのプロジェクト概要ページで確認できる値と一致する。" },
    { t:"AIProjectClient は API キー認証のみをサポートし、マネージド ID はサポートしない", c:false, e:"本来AIProjectClientはDefaultAzureCredential経由のMicrosoft Entra ID・マネージドID・キーベース認証を含む複数の認証方式をサポートしている。『APIキーのみ』という限定は事実に反する。" },
    { t:"開発者は AIProjectClient.inference プロパティ経由でエージェント クライアントにアクセスする", c:false, e:"本来エージェント クライアントはAIProjectClient.agentsプロパティ経由でアクセスする。.inferenceという名前のプロパティ経由ではないため、アクセス経路の名称を取り違えている。" },
    { t:"AIProjectClient インスタンスは複数のエージェント呼び出しを跨いで再利用できず、API コールごとにインスタンス化が必要である", c:false, e:"本来1つのAIProjectClientインスタンスは、アプリケーション内で多数の呼び出しやエージェント実行にわたって再利用するように設計されている。リクエストごとに作り直す必要はなく、この説明は実装上の推奨と逆行する。" }
  ],
  summary:"AIProjectClientはプロジェクトエンドポイントURL+資格情報で初期化し、複数認証方式に対応、インスタンスは使い回せる。エージェントアクセスは.agentsプロパティ経由（.inferenceではない）。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"AIProjectClientの初期化と使い方の正誤。" }
  ]
}

]);
