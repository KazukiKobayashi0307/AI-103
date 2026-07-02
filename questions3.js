/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ3
 *  出典: Microsoft 提供 AI-103 学習資料「Microsoft Foundry で AI 開発を計画する」
 *  source:"AI-103"（出題時にタグ表示）。
 *  解説基準: 各誤答は「本来そのサービス/機能は何か（本来の意味）」＋
 *  「このケースでなぜ不適か（当該ケースの問題）」を必ず明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q066", domain:"plan", type:"single", source:"AI-103",
  q:"Azure 上で、モデル・エージェント・ツール・ナレッジを 1 つのプロジェクト単位でまとめて管理しながら生成 AI ソリューションを開発したい。中心に据えるべきものはどれか。",
  choices:[
    { t:"Microsoft Foundry", c:true, e:"Microsoft Foundry は Azure における AI 開発の『包括的プラットフォーム』で、プロジェクト単位でリソース接続・データ・コード・モデル・エージェント・ツール・ナレッジを一元管理できる。Web の Foundry ポータルと Foundry SDK を備え、最も単純なもの以外の AI ソリューション構築における推奨手段。" },
    { t:"Azure Machine Learning のみ", c:false, e:"本来 Azure Machine Learning は機械学習モデルの学習・実験・MLOps に強い基盤。しかし本ケースは『生成 AI のモデル/エージェント/ツール/ナレッジをプロジェクトで束ねて開発』が主眼で、Foundry のプロジェクト組織・エージェント機能が中心となるため、AML 単独では要件の中心にならない。" },
    { t:"単一の LLM デプロイ", c:false, e:"本来 LLM デプロイは推論に使う個別リソースにすぎない。プロジェクトによる資産管理やエージェント/ツール/ナレッジの統合という『プラットフォーム』要件を満たさず、開発全体の中心には据えられない。" },
    { t:"Azure リソース グループ", c:false, e:"本来リソース グループは Azure リソースをまとめる『管理コンテナー』(課金/ライフサイクル単位)。AI 開発のプロジェクト組織やモデル/エージェント機能は提供しないため、AI ソリューション開発の中心概念ではない。" }
  ],
  summary:"Azure での AI 開発の中心プラットフォーム＝Microsoft Foundry（ポータル＋SDK、プロジェクトで資産を一元管理）。AML は ML 基盤、LLM デプロイは個別リソース、リソース グループは管理コンテナー。",
  keywords:[
    { k:"Microsoft Foundry", d:"Azure における生成 AI/エージェント開発のための包括的プラットフォーム。個別に AI リソースをプロビジョニングして使うこともできるが、Foundry の『プロジェクト組織・リソース管理・AI 開発機能』により、単純なもの以外の構築では推奨される方法。Web の Foundry ポータル(視覚的 UI)と Foundry SDK(プログラム)を提供する。" },
    { k:"Foundry ポータル と Foundry SDK", d:"ポータルは AI プロジェクトを操作する Web ベースの視覚的インターフェイス（モデルの検索/比較/デプロイ/テスト、エージェント作成、接続やキーの確認など）。SDK はプログラムから AI ソリューションを構築し、DevOps パイプラインでの CI/CD 自動化にも使える。" }
  ]
},
{
  id:"q067", domain:"plan", type:"single", source:"AI-103",
  q:"Microsoft Foundry のプロジェクトと、それが属する Azure リソースの関係として正しいものはどれか。",
  choices:[
    { t:"各プロジェクトは単一の Microsoft Foundry リソースに属し、その Foundry リソースは 1 つ以上の子プロジェクトを持てる（うち 1 つが既定プロジェクト）", c:true, e:"Foundry リソースがコンピューティング・データ ストレージ・AI ツール等を提供し、その配下に複数の子プロジェクトを持てる。各プロジェクトは 1 つの Foundry リソースに属し、リソースごとに 1 つが既定(default)プロジェクトに指定される。" },
    { t:"1 つのプロジェクトが複数の Foundry リソースに同時に属する", c:false, e:"本来プロジェクトは資産(モデル/エージェント/接続/コード)の管理単位。所属は 1 つの Foundry リソースに限られ、複数リソースへの同時所属という構成は取らない。" },
    { t:"1 つの Foundry リソースにはプロジェクトを 1 つしか作れない", c:false, e:"実際には 1 つの Foundry リソースは複数(1 つ以上)の子プロジェクトをサポートする。『1 つだけ』は誤り。" },
    { t:"プロジェクトは Foundry リソースなしで単独に存在できる", c:false, e:"プロジェクトはコンピューティングやストレージ等を提供する Foundry リソースに属して初めて機能する。リソースから独立して単独では存在しない。" }
  ],
  summary:"プロジェクト⊂単一 Foundry リソース。1 リソースは複数プロジェクトを持て、うち 1 つが既定。プロジェクト単独やマルチリソース同時所属は不可。",
  keywords:[
    { k:"Foundry リソースとプロジェクトの階層", d:"Foundry リソースはコンピューティング/データ ストレージ/AI ツール等のクラウド サービスを提供し、その下に 1 つ以上の子プロジェクトをぶら下げる。各プロジェクトは 1 リソースに属し、リソースごとに既定(default)プロジェクトが 1 つ定まる。プロジェクト固有資産とクラウド サービスを分離することで、一般的な AI 開発を最小の管理で回せる。" }
  ]
},
{
  id:"q068", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry にデプロイしたモデルに対して、既存の OpenAI SDK（OpenAI 構文）をそのまま使うチャット アプリを構築したい。接続に使うべきエンドポイント/SDK はどれか。",
  choices:[
    { t:"Azure OpenAI エンドポイント（OpenAI API / OpenAI SDK）", c:true, e:"Foundry のモデルには 2 通りの接続法があり、OpenAI 構文を使うアプリでは Azure OpenAI エンドポイントに OpenAI API/SDK で接続する。既存の OpenAI 実装を活かせるのがこの経路。" },
    { t:"プロジェクト エンドポイント（Foundry 固有の API / Foundry SDK）", c:false, e:"本来プロジェクト エンドポイントは Foundry 固有の API/SDK でエージェントや Foundry IQ など Foundry 資産にアクセスする経路。OpenAI 構文のチャット アプリをそのまま動かす目的では、OpenAI SDK 対応の Azure OpenAI エンドポイントの方が適する。" },
    { t:"Foundry Tools エンドポイント", c:false, e:"本来 Foundry Tools エンドポイントは Language/Speech/Translator など既製 AI サービスを呼ぶための経路。LLM のチャット入力候補生成には使わないため不適。" },
    { t:"MCP エンドポイント", c:false, e:"本来 MCP(モデル コンテキスト プロトコル)はエージェントにカスタム/サードパーティ ツールやナレッジを接続するためのプロトコル。モデルへの OpenAI 形式のチャット呼び出しの経路ではない。" }
  ],
  summary:"OpenAI 構文のアプリ→Azure OpenAI エンドポイント＋OpenAI SDK。Foundry 固有資産(エージェント/IQ)→プロジェクト エンドポイント＋Foundry SDK。両経路の使い分けが要点。",
  keywords:[
    { k:"プロジェクト エンドポイント vs Azure OpenAI エンドポイント", d:"Foundry のモデルには 2 つの接続法がある。①プロジェクト エンドポイント: Foundry 固有の API/SDK で、エージェントや Foundry IQ など Foundry 資産を扱う。②Azure OpenAI エンドポイント: OpenAI API/SDK で、OpenAI 構文をサポートする Foundry モデルにチャット等を投げる。既存 OpenAI コード資産を活かすなら後者。" },
    { k:"Foundry Models（モデル カタログ）", d:"Microsoft・OpenAI・その他プロバイダーのモデルを網羅するカタログ。ここから LLM をデプロイし、上記いずれかのエンドポイントで接続・操作する。" }
  ]
},
{
  id:"q069", domain:"agent", type:"multi", source:"AI-103",
  q:"Microsoft Foundry でエージェントを定義するとき、エージェント構成としてカプセル化される中核要素はどれか。3 つ選べ。",
  choices:[
    { t:"LLM（基盤となる大規模言語モデル）", c:true, e:"エージェントは推論の頭脳として LLM を持つ。どのモデルで動くかを定義する必須要素。" },
    { t:"命令（instructions）", c:true, e:"エージェントの責任・振る舞い・口調・禁止事項などを規定するシステム指示。エージェントのアイデンティティを定める中核。" },
    { t:"ツール（tools）", c:true, e:"Web 検索やコード インタープリターなどの組み込み機能、または MCP 経由のカスタム/サードパーティ機能。タスクを実際に遂行するための手段としてカプセル化される。" },
    { t:"仮想ネットワーク（VNet）", c:false, e:"本来 VNet はネットワーク分離/到達制御のインフラ設定。エージェントの定義(頭脳・指示・道具)の構成要素ではなく、要件に無関係。" },
    { t:"課金プラン（価格レベル）", c:false, e:"本来価格レベルはコスト/クォータの設定。エージェントの能力や振る舞いを定義する構成要素ではない。" }
  ],
  summary:"Foundry エージェント＝LLM＋命令(instructions)＋ツール(tools) をカプセル化した名前付き構成。VNet や価格レベルは定義要素ではない。",
  keywords:[
    { k:"Foundry のエージェント", d:"タスクを自動化し、ユーザーや他のエージェントと共同作業できる自律 AI エンティティ。LLM・命令(instructions)・ツールをカプセル化した名前付き構成として定義され、Microsoft Foundry Agent サービスをプロジェクト エンドポイント経由で使って開発・利用する。" },
    { k:"エージェントのツール", d:"組み込み(Web 検索・コード インタープリター 等)か、MCP 接続によるカスタム/サードパーティ ツール。さらに Foundry Tools(Language/Speech/Translator/Content Understanding 等)も利用でき、これらはプロジェクトに関連付く Foundry リソース上でホストされる。" }
  ]
},
{
  id:"q070", domain:"agent", type:"single", source:"AI-103",
  q:"Foundry で作成したエージェントを開発・実行するために使用するサービスと接続経路の組み合わせはどれか。",
  choices:[
    { t:"Microsoft Foundry Agent サービス（プロジェクト エンドポイント経由）", c:true, e:"Foundry のエージェントは Foundry Agent サービスを使い、プロジェクト エンドポイント経由で開発・利用する。会話状態(スレッド)やツール呼び出しの処理もこのサービスが担う。" },
    { t:"Azure Bot Service", c:false, e:"本来 Bot Service はチャネル横断のボット構築/ホスティング基盤。Foundry のエージェント資産を開発・実行するための正規経路ではない。" },
    { t:"Azure OpenAI エンドポイントに OpenAI SDK で直接接続", c:false, e:"本来この経路は OpenAI 構文でモデルへチャットを投げるためのもの。エージェント(命令＋ツール＋状態管理を伴う自律エンティティ)の開発・実行の仕組みそのものではない。" },
    { t:"Azure Machine Learning パイプライン", c:false, e:"本来 AML パイプラインは ML の学習/推論ワークフローのオーケストレーション。Foundry エージェントの開発・実行経路ではない。" }
  ],
  summary:"Foundry エージェントの開発/実行＝Foundry Agent サービス＋プロジェクト エンドポイント。Bot Service/AML/OpenAI 直叩きは別目的。",
  keywords:[
    { k:"Microsoft Foundry Agent サービス", d:"エージェントの作成・実行を担う Foundry のサービス。プロジェクト エンドポイントを介して利用し、スレッドによる会話状態管理やツール呼び出しの自動処理を提供する。命令とツールを与えれば、モデルが必要に応じてツールを呼び出しタスクを遂行する。" }
  ]
},
{
  id:"q071", domain:"agent", type:"single", source:"AI-103",
  q:"Foundry エージェントに与えるツールのうち『組み込み(built-in)』に該当するものはどれか。",
  choices:[
    { t:"コード インタープリター", c:true, e:"コード インタープリターは Web 検索と並ぶ組み込みツールの代表例。追加接続なしでエージェントにコード実行能力を与える。" },
    { t:"社内 API を呼ぶカスタム ツール", c:false, e:"本来これは有用だが『組み込み』ではなく、MCP 接続などで外部に用意するカスタム ツール。built-in の分類には当てはまらない。" },
    { t:"サードパーティ製 SaaS ツール", c:false, e:"本来サードパーティ ツールは MCP 接続を介して統合するもので、Foundry に最初から備わる組み込みツールではない。" },
    { t:"Foundry IQ ナレッジ接続", c:false, e:"本来 Foundry IQ はナレッジ ソースへの中央接続(MCP ベース)であり、ツールの一分類ではあるが『Web 検索/コード インタープリター』のような組み込み機能そのものを指す語ではない。" }
  ],
  summary:"組み込みツールの代表＝Web 検索・コード インタープリター。カスタム/サードパーティは MCP 経由で接続する外部ツール。",
  keywords:[
    { k:"組み込みツール vs MCP 接続ツール", d:"組み込み(built-in)ツールは Web 検索やコード インタープリターなど Foundry に標準搭載の機能。これに対し、独自処理や外部サービスは MCP(モデル コンテキスト プロトコル)接続を介してカスタム/サードパーティ ツールとして統合する。要件に応じて両者を組み合わせる。" }
  ]
},
{
  id:"q072", domain:"knowledge", type:"single", source:"AI-103",
  q:"複数のナレッジ ソースを 1 つの中央接続にまとめてエージェントのプロンプトをコンテキスト化したい。Foundry で使うべき仕組みはどれか。",
  choices:[
    { t:"Foundry IQ", c:true, e:"Foundry IQ は、複数ナレッジ ソースとの統合を簡略化する『1 つの中央 MCP ベースのナレッジ接続』を作れる仕組み。エージェントはツール経由でこれに接続し、含まれるデータでプロンプトをコンテキスト化できる。" },
    { t:"Azure AI Search 単体のインデックス", c:false, e:"本来 AI Search は文書の索引化・検索を担う強力なサービスで、ナレッジ ソースの 1 つになり得る。しかし『複数ソースを 1 つの中央接続に集約する』役割は Foundry IQ のもので、AI Search 単体はその集約層ではない。" },
    { t:"ナレッジ ストアのテーブル プロジェクション", c:false, e:"本来これは AI Search のエンリッチ結果を Azure Storage にテーブル形式で保存する機能。複数ナレッジを 1 接続に束ねる用途とは別物。" },
    { t:"Blob Storage コンテナー", c:false, e:"本来 Blob は非構造データの保管先。ナレッジの一次データ置き場にはなるが、中央 MCP ナレッジ接続そのものではない。" }
  ],
  summary:"複数ナレッジを 1 つの中央 MCP 接続に集約＝Foundry IQ。AI Search/ナレッジ ストア/Blob は個々のソースや保存先で、集約層ではない。",
  keywords:[
    { k:"Foundry IQ", d:"複数のナレッジ ソースとの統合を簡略化するため、プロジェクトで 1 つの中央 MCP ベースのナレッジ接続を作成できる機能。エージェントはツールを通じてこの接続に到達し、含まれるデータでプロンプトをグラウンド(コンテキスト化)する。" },
    { k:"MCP（モデル コンテキスト プロトコル）", d:"エージェントに対し、カスタム/サードパーティ ツールや(Foundry IQ 経由の)ナレッジ ソースを接続するための標準プロトコル。ツールやナレッジをモデルへ橋渡しする共通の仕組み。" }
  ]
},
{
  id:"q073", domain:"plan", type:"single", source:"AI-103",
  q:"Foundry Tools（Foundry の既製 AI サービス群）の説明として正しいものはどれか。",
  choices:[
    { t:"テキスト分析・音声・翻訳・コンテンツ理解などの一般タスク向けに、すぐ使える事前構築済み API/モデルのセットで、プロジェクトに関連付く Foundry リソース上でホストされる", c:true, e:"Foundry Tools は Azure Language/Speech/Translator/Document Intelligence/Content Understanding などの既製サービス群。生成 AI エージェントだけに頼るより、コスト効率が高く予測可能なソリューションを作れる。Foundry リソース上でホストされ、ツール固有エンドポイント＋プロジェクト認証キー(またはトークン認証)で使う。" },
    { t:"LLM をゼロから学習・微調整するためのトレーニング基盤", c:false, e:"本来モデルの微調整は別機能(fine-tuning)。Foundry Tools は『学習』基盤ではなく『すぐ使える既製 API/モデル』の集合であり、性質が異なる。" },
    { t:"開発者が使う IDE と拡張機能の総称", c:false, e:"本来 IDE/拡張は Visual Studio・VS Code・Foundry Toolkit のこと。Foundry Tools は開発ツールではなく AI サービス群であり混同は誤り。" },
    { t:"複数エージェントを編成するオーケストレーション フレームワーク", c:false, e:"本来マルチエージェント編成は Semantic Kernel/Agent Framework 等の役割。Foundry Tools は個別の AI タスク(言語/音声/翻訳等)を提供するもので、オーケストレーション フレームワークではない。" }
  ],
  summary:"Foundry Tools＝既製 AI サービス群(Language/Speech/Translator/Doc Intelligence/Content Understanding)。学習基盤でも IDE でもオーケストレーション FW でもない。",
  keywords:[
    { k:"Foundry Tools", d:"アプリに統合できる、すぐ使える事前構築済み API/モデルのセット。生成 AI ベースのエージェントだけに依存するより、コスト効率が高く予測可能なソリューションを作れる。Foundry リソース上でホストされ、ツール固有エンドポイントへ接続し、プロジェクト認証キーまたはトークンベース認証で利用する。一部ツールはポータルに構成/テスト用 UI を持つ。" }
  ]
},
{
  id:"q074", domain:"plan", type:"single", source:"AI-103",
  q:"クライアント アプリから Foundry Tools（例: Azure Language）を利用する。必要な手順として正しいものはどれか。",
  choices:[
    { t:"Foundry リソース内のツール固有エンドポイントに接続し、プロジェクト認証キーまたはトークンベース認証を指定して、ツール固有の API/SDK を使う", c:true, e:"Foundry Tools の利用手順そのもの。ツールごとのエンドポイントへ接続し、プロジェクト認証キーかトークン認証で認証したうえで、ツール固有 API/SDK(または REST)を呼ぶ。" },
    { t:"プロジェクト エンドポイントに Foundry SDK で接続してエージェントを作成する", c:false, e:"本来これはエージェントや Foundry IQ など『Foundry 固有資産』にアクセスする経路。既製ツール(Language 等)を直接呼ぶ手順とは異なる。" },
    { t:"Azure OpenAI エンドポイントに OpenAI SDK で接続する", c:false, e:"本来これは OpenAI 構文で LLM にチャットを投げる経路。テキスト分析等の既製ツールを呼ぶための接続ではない。" },
    { t:"モデルをローカルにエクスポートしてオフライン実行する", c:false, e:"本来エクスポートは一部のエッジ シナリオ(例: Custom Vision の Compact)の話。Foundry Tools はクラウドの既製 API として呼ぶものであり、この手順は当てはまらない。" }
  ],
  summary:"Foundry Tools 利用＝ツール固有エンドポイント＋プロジェクト認証キー/トークン＋ツール固有 API/SDK(またはREST)。エージェント経路や OpenAI 経路とは別。",
  keywords:[
    { k:"Foundry Tools の認証", d:"クライアントは Foundry リソース内のツール固有エンドポイントへ接続し、プロジェクト認証キーを渡すか、トークンベース認証(Entra ID)を使う。キーは管理が容易だが漏えいリスクがあるため、運用ではトークン(マネージド ID)認証が推奨されることが多い。" }
  ]
},
{
  id:"q075", domain:"nlp", type:"single", source:"AI-103",
  q:"顧客レビュー本文のセンチメント分析・エンティティ抽出・要約、さらに質問応答や会話言語モデルの構築まで行いたい。使うべき Foundry Tool はどれか。",
  choices:[
    { t:"Azure Language", c:true, e:"Azure Language は自然言語テキストの分析(エンティティ抽出/センチメント/要約 等)に加え、会話言語モデル(CLU)や質問応答ソリューションの構築機能も提供する。挙げられた要件を一手に満たす。" },
    { t:"Azure Speech", c:false, e:"本来 Speech は音声認識(STT)・音声合成(TTS)・リアルタイム ライブ音声など『音声』の処理が対象。テキストのセンチメントやエンティティ抽出、質問応答の構築は範囲外。" },
    { t:"Azure Translator", c:false, e:"本来 Translator は言語間のテキスト翻訳に特化。センチメントや要約、質問応答の構築は行わない。" },
    { t:"Azure Content Understanding", c:false, e:"本来 Content Understanding はフォーム/文書/画像/動画/音声からデータを抽出するマルチモーダル分析。会話言語モデルや質問応答の構築が主目的の本ケースには Azure Language が直接的。" }
  ],
  summary:"テキスト分析＋会話言語モデル＋質問応答＝Azure Language。音声=Speech、翻訳=Translator、マルチモーダル抽出=Content Understanding。",
  keywords:[
    { k:"Azure Language（Foundry Tools）", d:"自然言語テキストの分析(キー フレーズ/エンティティ抽出/センチメント/PII/要約/言語検出)と、会話言語理解(CLU)・カスタム質問応答の構築を提供する既製 AI サービス。多くの NLP タスクを LLM でも行えるが、統計的手法やタスク特化モデルが有利な用途(分類/センチメント/要約)で価値が高い。" }
  ]
},
{
  id:"q076", domain:"knowledge", type:"single", source:"AI-103",
  q:"フォーム・文書に加え、画像・ビデオ・オーディオ ストリームからもデータを抽出するマルチモーダルなソリューションを作りたい。最適な Foundry Tool はどれか。",
  choices:[
    { t:"Azure Content Understanding", c:true, e:"Content Understanding はフォーム/文書/画像/ビデオ/オーディオを横断してデータを抽出できるマルチモーダル コンテンツ分析。動画・音声まで含む本要件に最も合致する。" },
    { t:"Azure ドキュメント インテリジェンス", c:false, e:"本来 Doc Intelligence は請求書/領収書/フォーム等『文書』からのフィールド抽出に特化(事前構築/カスタム)。強力だが、ビデオやオーディオ ストリームの分析は範囲外なので本ケースには不足。" },
    { t:"Azure AI Vision", c:false, e:"本来 Vision は画像/一部ビデオの視覚解析(タグ/物体/OCR 等)。文書やオーディオを含む統合的なマルチモーダル抽出という要件全体はカバーしない。" },
    { t:"Azure Language", c:false, e:"本来 Language はテキスト分析が対象。画像・ビデオ・オーディオからの抽出は担わないため不適。" }
  ],
  summary:"画像＋ビデオ＋オーディオ＋文書のマルチモーダル抽出＝Content Understanding。文書特化は Doc Intelligence、画像は Vision、テキストは Language。",
  keywords:[
    { k:"Azure Content Understanding", d:"フォーム/文書/画像/ビデオ/オーディオ ストリームからデータを抽出するモデルを構築できるマルチモーダル コンテンツ分析サービス。出力スキーマを定義して、多様なメディアから構造化情報(フィールド/分類/要約 等)を取り出せる点が、文書特化の Doc Intelligence との違い。" }
  ]
},
{
  id:"q077", domain:"plan", type:"multi", source:"AI-103",
  q:"Visual Studio Code 用の Foundry Toolkit（拡張機能）で実行できるワークフローはどれか。3 つ選べ。",
  choices:[
    { t:"モデル カタログからのモデルのデプロイ", c:true, e:"Foundry Toolkit はモデル カタログを参照し、モデルをデプロイするワークフローを VS Code から簡略化できる。" },
    { t:"統合プレイグラウンドでのモデル/エージェントのテスト", c:true, e:"拡張機能内の統合プレイグラウンドでデプロイ済みモデルやエージェントを対話的にテストできる。" },
    { t:"エージェントをアプリに接続する統合コードの生成", c:true, e:"エージェントをアプリに組み込むための統合コードを生成でき、開発の橋渡しを自動化する。" },
    { t:"物理サーバーの OS パッチ適用", c:false, e:"本来 OS パッチ管理はインフラ運用(Update Manager 等)の領域。AI アプリ開発を支援する Foundry Toolkit の機能ではない。" },
    { t:"Azure の請求書発行と支払い処理", c:false, e:"本来課金/支払いは Cost Management/Billing の領域。開発支援拡張機能である Foundry Toolkit の機能ではない。" }
  ],
  summary:"Foundry Toolkit(VS Code)＝リソース参照/管理・モデルのデプロイ・プレイグラウンドでのテスト・宣言型/ホスト型エージェント構成(デザイナー+YAML)・統合コード生成。インフラ運用や課金処理は対象外。",
  keywords:[
    { k:"Foundry Toolkit for VS Code", d:"VS Code 拡張機能。デプロイ済みモデル/エージェント/接続/ベクター ストア等のプロジェクト リソースの参照・管理、モデル カタログからのデプロイ、統合プレイグラウンドでのテスト、ビジュアル デザイナーと YAML による宣言型/ホスト型エージェント構成、エージェント接続用の統合コード生成を提供する。" },
    { k:"開発環境の選択（Visual Studio と VS Code）", d:"Visual Studio は .NET/Windows 向けアプリ開発に強い IDE。VS Code はオープンソース言語/ライブラリや Web 開発者に好まれる軽量エディター。どちらも Azure での AI アプリ開発に適し、GitHub と GitHub Copilot に統合できる。" }
  ]
},
{
  id:"q078", domain:"plan", type:"single", source:"AI-103",
  q:"チームは主に .NET Framework を用い、Windows 向けアプリを構築している。この開発者に最も適した開発環境はどれか。",
  choices:[
    { t:"Microsoft Visual Studio", c:true, e:"Visual Studio は .NET/Windows アプリ開発に重点を置く統合開発環境(IDE)で、この開発者の言語/対象に最も合う。Azure での AI アプリ開発にも適する。" },
    { t:"Visual Studio Code のみ（他は不可）", c:false, e:"本来 VS Code はオープンソース言語/ライブラリや Web 開発者に好まれる軽量エディターで、AI 開発にも適する。ただし『.NET/Windows 重視』の本ケースでは IDE の Visual Studio がより自然。VS Code が使えないわけではないが『最も適した』選択ではない。" },
    { t:"Azure portal のみ", c:false, e:"本来 Azure portal はリソース管理の Web UI。アプリのコード記述/テスト/デバッグを行う開発環境ではないため不適。" },
    { t:"Foundry ポータルのみ", c:false, e:"本来 Foundry ポータルは AI プロジェクトの視覚的管理/テスト用。多くの開発タスクを行えるが、.NET アプリのコーディング IDE の代替にはならない。" }
  ],
  summary:".NET/Windows 重視＝Visual Studio(IDE)。オープンソース/Web＝VS Code。どちらも Azure AI 開発に適するが、対象言語/プラットフォームで選ぶ。",
  keywords:[
    { k:"Visual Studio vs VS Code", d:"Visual Studio は .NET Framework/Windows 開発に強い本格 IDE。VS Code は多言語・クロスプラットフォームの軽量コード エディターで、拡張機能(Foundry Toolkit 等)で機能を足す。どちらも GitHub/GitHub Copilot と統合でき、Azure での AI 開発に使える。選択は言語・SDK・対象プラットフォーム・好みで決める。" }
  ]
},
{
  id:"q079", domain:"plan", type:"single", source:"AI-103",
  q:"AI-103 の学習資料が『Azure で AI アプリを開発できる』として挙げる一般的なプログラミング言語に含まれないものはどれか。",
  choices:[
    { t:"Ruby", c:true, e:"資料が挙げる主要言語は C#・Python・Node・TypeScript・Java。Ruby はこの列挙に含まれない(＝本問の『含まれないもの』)。" },
    { t:"Python", c:false, e:"Python は AI 開発で広く使われ、資料の列挙にも含まれる。含まれるので本問の答えではない。" },
    { t:"C#", c:false, e:"C# は .NET エコシステムの中心言語で、資料の列挙に含まれる。" },
    { t:"TypeScript", c:false, e:"TypeScript(および Node)は資料の列挙に含まれる。" }
  ],
  summary:"資料の主要言語＝C#/Python/Node/TypeScript/Java。Ruby は列挙外。",
  keywords:[
    { k:"Foundry で使う API/SDK", d:"Microsoft Foundry SDK(Foundry プロジェクトに接続し、エージェントや Foundry IQ など Foundry 固有資産へアクセス)、OpenAI API/SDK(OpenAI 構文の Foundry モデルでチャット構築)、Foundry Tools SDK(AI サービス固有のライブラリ、REST でも利用可)を、C#/Python/Node/TypeScript/Java などから利用する。" }
  ]
},
{
  id:"q080", domain:"plan", type:"single", source:"AI-103",
  q:"DevOps パイプライン内で、スクリプトや自動 CI/CD アクションにより Foundry プロジェクトの資産(エージェント等)を作成・管理したい。使うべきものはどれか。",
  choices:[
    { t:"Microsoft Foundry SDK", c:true, e:"Foundry SDK はプログラムから Foundry プロジェクトに接続して資産を作成・管理でき、DevOps パイプラインでの CI/CD 自動化に使える。自動化要件に直接合致する。" },
    { t:"Foundry ポータル（手動操作）", c:false, e:"本来ポータルは視覚的に開発/管理する Web UI で有用だが、手動操作が中心のため、スクリプト化された自動 CI/CD 実行には向かない。" },
    { t:"Azure portal のダッシュボード", c:false, e:"本来 Azure portal はリソースの手動管理 UI。Foundry プロジェクト資産のコードによる自動作成/管理の手段ではない。" },
    { t:"Kusto (KQL) クエリ", c:false, e:"本来 KQL は Log Analytics 等のログ分析言語。資産の作成/管理を行うものではなく、目的が異なる。" }
  ],
  summary:"CI/CD で Foundry 資産を自動作成/管理＝Foundry SDK(スクリプト)。ポータル/Azure portal は手動 UI、KQL はログ分析。",
  keywords:[
    { k:"Foundry SDK と CI/CD", d:"Foundry SDK は Foundry プロジェクトへの接続と資産(モデル デプロイ/エージェント/接続 等)の作成・管理をコードで行える。これにより DevOps パイプラインでスクリプトや自動 CI/CD アクションとして資産を扱え、再現性のある展開を実現する。" }
  ]
},
{
  id:"q081", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry Models（モデル カタログ）で利用できるモデルの提供元について、正しい説明はどれか。",
  choices:[
    { t:"Microsoft、OpenAI、およびその他のプロバイダーのモデルを含む包括的なカタログである", c:true, e:"Foundry Models は Microsoft・OpenAI・その他プロバイダーのモデルを網羅するカタログ。用途に応じて幅広い選択肢から選べる。" },
    { t:"OpenAI のモデルのみを提供する", c:false, e:"本来 OpenAI のモデルはカタログの重要な一部だが『のみ』ではない。Microsoft や他プロバイダーのモデルも含まれるため誤り。" },
    { t:"ユーザーが自作した LLM しか登録できない", c:false, e:"本来カタログは各社の事前提供モデルを中心とする。自作モデルの登録可否に関わらず『自作のみ』という説明は事実に反する。" },
    { t:"コンピューター ビジョン モデルは一切含まない", c:false, e:"本来カタログは LLM を中心に多様なモデルを扱う。『ビジョンを一切含まない』と断定するのは誤りで、マルチモーダル/各種モデルも視野に入る。" }
  ],
  summary:"Foundry Models＝Microsoft＋OpenAI＋その他プロバイダーの包括的カタログ。『OpenAI のみ』は誤り。",
  keywords:[
    { k:"Foundry Models", d:"Microsoft・OpenAI・その他プロバイダーのモデルを集めた包括的カタログ。ここからモデルをデプロイし、プロジェクト エンドポイント(Foundry API/SDK)または Azure OpenAI エンドポイント(OpenAI API/SDK)で接続・利用する。Foundry ポータルで検索/比較/デプロイ/テストできる。" }
  ]
},
{
  id:"q082", domain:"plan", type:"single", source:"AI-103",
  q:"生成 AI エージェントだけに頼るのではなく、一般的な AI タスクに既製機能を活用したい理由として、AI-103 資料が挙げる利点はどれか。",
  choices:[
    { t:"コスト効率が高く、予測可能なソリューションを作りやすい", c:true, e:"資料は、Foundry Tools のような既製 API/モデルを使うと、生成 AI ベースのエージェントだけに依存するよりコスト効率が高く予測可能なソリューションを作れる、と説明している。" },
    { t:"モデルの学習を必ずゼロから行える", c:false, e:"本来ゼロからの学習は稀で高コストな選択。既製ツールの利点はむしろ『学習不要ですぐ使える』ことであり、この説明は主旨と逆。" },
    { t:"責任ある AI の考慮が不要になる", c:false, e:"本来どのソリューションでも責任ある AI(公平性/安全性/透明性 等)の考慮は必要。既製ツールを使っても免除されないため誤り。" },
    { t:"インターネット接続なしで常に動作する", c:false, e:"本来 Foundry Tools はクラウドの API として呼ぶのが基本。オフライン常時動作は一般的な利点として資料が挙げるものではない。" }
  ],
  summary:"既製ツール活用の利点＝コスト効率が高く予測可能。学習必須化/責任ある AI 免除/常時オフラインは誤り。",
  keywords:[
    { k:"既製ツール(Foundry Tools)を使う判断", d:"翻訳・音声・テキスト分析・文書抽出のような一般的タスクは、生成 AI に都度解かせるより、専用の既製 API/モデルを使う方がコスト効率・予測可能性・レイテンシで有利なことが多い。生成 AI とツールを適材適所で組み合わせるのが実務の定石。" }
  ]
},
{
  id:"q083", domain:"plan", type:"multi", source:"AI-103",
  q:"Microsoft Foundry ポータルで実行できるタスクはどれか。3 つ選べ。",
  choices:[
    { t:"モデルの検索・比較・デプロイ・テスト", c:true, e:"ポータルはモデル カタログの検索/比較や、デプロイ、プレイグラウンドでのテストを行える。" },
    { t:"エージェントの作成とテスト", c:true, e:"ポータル上でエージェントを作成し、その動作をテストできる。" },
    { t:"クライアント アプリに必要なエンドポイントとキーの確認", c:true, e:"資産にアクセスするためのエンドポイントとキーをポータルで確認できる。" },
    { t:"Windows Server の Active Directory ドメイン構築", c:false, e:"本来 AD ドメイン構築はオンプレ/IaaS のインフラ作業。AI プロジェクト管理を行う Foundry ポータルの機能ではない。" },
    { t:"物理ネットワーク配線の設計", c:false, e:"本来これはデータセンター/施設側の物理作業。ソフトウェア プラットフォームである Foundry ポータルとは無関係。" }
  ],
  summary:"Foundry ポータル＝モデルの検索/比較/デプロイ/テスト、エージェント作成/テスト、ツールや Foundry IQ への MCP 接続、リソース構成/ユーザー アクセス管理、エンドポイント/キー確認。インフラ物理作業は対象外。",
  keywords:[
    { k:"Foundry ポータルでできること", d:"モデルの検索/比較/デプロイ/テスト、エージェントの作成/テスト、ツールや Foundry IQ ナレッジ ソースへの MCP 接続作成、Foundry Tools の調査/テスト、リソース構成とユーザー アクセスの管理、クライアントから資産へアクセスするためのエンドポイント/キーの確認。多くの開発タスクをコードなしで進められる。" }
  ]
},
{
  id:"q084", domain:"plan", type:"single", source:"AI-103",
  q:"ソース管理と DevOps 管理を担い、Visual Studio と VS Code の両方にネイティブ統合され、AI コーディング アシスタントも提供するプラットフォームはどれか。",
  choices:[
    { t:"GitHub（および GitHub Copilot）", c:true, e:"GitHub はソース管理/DevOps の主要プラットフォームで、Visual Studio と VS Code の双方にネイティブ統合される。AI アシスタントの GitHub Copilot により開発生産性を大きく高められる。" },
    { t:"Azure DevOps Boards のみ", c:false, e:"本来 Azure Boards は作業項目/かんばん管理の機能。ソース管理と AI コーディング アシスタント(Copilot)を一体で指す本問の説明には合致しない。" },
    { t:"Azure Monitor", c:false, e:"本来 Azure Monitor は監視/メトリック/ログの基盤。ソース管理や AI コーディング支援の役割ではない。" },
    { t:"Foundry IQ", c:false, e:"本来 Foundry IQ はナレッジの中央 MCP 接続。ソース管理/DevOps や Copilot とは無関係。" }
  ],
  summary:"ソース管理＋DevOps＋AI コーディング支援(Copilot)＝GitHub。VS/VS Code にネイティブ統合。",
  keywords:[
    { k:"GitHub / GitHub Copilot", d:"GitHub はソース管理と DevOps の世界的プラットフォームで、Visual Studio・VS Code にネイティブ統合される。GitHub Copilot は AI ペア プログラマーとしてコード補完/生成/説明を支援し、開発者の生産性と有効性を高める。チーム開発の中核要素になり得る。" }
  ]
},
{
  id:"q085", domain:"plan", type:"single", source:"AI-103",
  q:"開発者が Microsoft Foundry ポータルで直接行えるが、コードの記述・テスト・デプロイのために別途必要になるものはどれか。",
  choices:[
    { t:"開発環境（Visual Studio や VS Code）と SDK/API", c:true, e:"ポータルで多くの開発タスクを行えるが、実際のアプリのコード記述・テスト・デプロイには IDE/エディター(Visual Studio・VS Code)と SDK/API が別途必要になる。" },
    { t:"物理データセンターの契約", c:false, e:"本来 Azure はクラウドで、物理データセンターの個別契約は不要。コード開発の前提にもならない。" },
    { t:"オンプレミスの GPU クラスター", c:false, e:"本来 GPU クラスターは大規模学習等で使うことはあるが、Foundry でのアプリ開発一般に必須の前提ではない。既製モデル/ツール利用ではクラウド側が担う。" },
    { t:"専用の物理ネットワーク機器", c:false, e:"本来ネットワーク機器の手配はクラウド利用では不要。コードの記述/テスト/デプロイの前提条件ではない。" }
  ],
  summary:"ポータルで多くを行えるが、コードの記述/テスト/デプロイには開発環境(VS/VS Code)＋SDK/API が別途必要。物理インフラの手配は不要。",
  keywords:[
    { k:"ポータルと開発環境の役割分担", d:"Foundry ポータルはモデル/エージェント/接続の視覚的な作成・テスト・管理に向く。一方、業務アプリのコード実装・単体/結合テスト・デプロイは Visual Studio や VS Code などの開発環境と、Foundry SDK/OpenAI SDK/Foundry Tools SDK(または REST)を使って行う。" }
  ]
}

]);
