/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ10 (q211-q230)
 *  出典: Udemy掲載のAI-103対策講座（ユーザー提供の20問を再構成、第2弾）。
 *  source:"Udemy AI-103" を付与。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q211", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるデータサイエンティストが RAG パイプラインの品質を評価する prompt flow を構築しています。モデルの回答が取得した文脈文書によって裏付けられているかを測定したいと考えています。どの組み込み評価器を使うべきですか？",
  choices:[
    { t:"グラウンディング性 (Groundedness) 評価器", c:true, e:"グラウンディング性評価器は、応答が提供された文脈文書によって裏付けられているかを特に測定するもので、これはRAGパイプラインの主要な品質次元にあたる。本要件（文脈への忠実性の測定）に直接対応する。" },
    { t:"流暢性 (Fluency) 評価器", c:false, e:"本来これは言語が自然で文法的に正しいかを測定する評価器。文の巧拙は見るが、文脈文書による事実の裏付けは評価対象に含まれないため本要件には合わない。" },
    { t:"一貫性 (Coherence) 評価器", c:false, e:"本来これは応答が論理的・構造的にまとまっているかを評価する評価器。話の筋が通っているかを見るのであって、文脈文書との事実的整合性を測るものではないため本要件には不足する。" },
    { t:"類似度 (Similarity) 評価器", c:false, e:"本来これは生成された回答と参照(ゴールド)回答とのコサイン距離を測る評価器。取得した文脈での事実的グラウンディングではなく、あらかじめ用意した正解例との類似度を見るものであり、本要件の観点とは異なる。" }
  ],
  summary:"RAGの文脈裏付けを測る＝グラウンディング性評価器。流暢性/一貫性/類似度はいずれも別の品質次元を測る。",
  keywords:[
    { k:"prompt flow 組み込み評価器（Groundedness / Fluency / Coherence / Similarity）と Simulator", d:"各評価器の測定対象の違い。" }
  ]
},
{
  id:"q212", domain:"genai", type:"multi", source:"Udemy AI-103",
  q:"ある開発者が Microsoft Foundry で prompt flow を作成しています。prompt flow オーサリングに関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"prompt flow は flow.dag.yaml という名前の YAML ファイルで定義される", c:true, e:"正解。prompt flow はフローディレクトリのルートに置かれる flow.dag.yaml というYAMLファイルでノード構成・データフローを定義する。" },
    { t:"prompt flow は Foundry ポータルのビジュアルキャンバスでのみ編集できる", c:false, e:"本来prompt flowはFoundryポータルのビジュアルキャンバスに加えて、promptflow CLI（pf flow test、pf run createなど）とエディタを使いローカルでも編集できる。『ビジュアルキャンバスのみ』という限定は事実に反する。" },
    { t:"prompt flow の LLM ノードは、プロンプトテンプレートを使って Azure OpenAI などのモデルエンドポイントを呼び出す", c:true, e:"正解。LLMノードはプロンプトテンプレートを使いAzure OpenAIなどのモデルエンドポイントを呼び出し、temperatureやmax_tokensなどのパラメータをノードごとに構成できる。" },
    { t:"prompt flow はクラウドでのみ実行でき、オーサリング中にローカルでテスト・実行することはできない", c:false, e:"本来prompt flowはpf flow testやpf run createでローカル実行でき、マネージドエンドポイントへのデプロイ前に高速なイテレーションが可能。『クラウドでのみ実行』という限定は誤り。" },
    { t:"prompt flow は LLM ノードのみを含むことができ、Python ロジックを含めることはできない", c:false, e:"本来prompt flowには任意の処理ロジックを持つPythonノードを含めることができ、LLMノードに限定されない。" }
  ],
  summary:"prompt flowはflow.dag.yamlで定義され、LLMノードがモデルエンドポイントを呼び出す。ビジュアルキャンバス限定・クラウド限定実行・LLMノード限定という制約はいずれも誤り。",
  keywords:[
    { k:"prompt flow のオーサリング（flow.dag.yaml / LLM ノード / Python ノード / pf CLI）", d:"flow.dag.yamlとLLM/Pythonノード。" }
  ]
},
{
  id:"q213", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"あるチームが社内ナレッジ検索のための RAG パイプラインを構築しました。ベクトル検索のみを使った場合にキーワード重視の技術系クエリで結果が悪いことに気づきました。精度とセマンティック再現率を同時に改善するためにどの検索戦略を実装すべきですか？",
  choices:[
    { t:"クエリ語を同義語辞書で拡張した BM25 キーワード検索のみを使い、転置インデックスの語彙一致だけでランキングを行う", c:false, e:"本来これはキーワード精度の改善策ではあるが、語の完全一致がなくても概念的に関連する文書を拾えず、セマンティック再現率が落ちるため、精度とセマンティック再現率を同時に改善したい本要件には不十分。" },
    { t:"キーワードバイアスを避けるため、BM25 を一切使わずにセマンティックランカーのみを単独で使い、埋め込みの類似度だけで並べ替える", c:false, e:"本来セマンティックランカーは既存のBM25結果集合を再ランキングするための機能であり、単独では機能しない。BM25なしで単独使用するという構成自体が標準的でなく、キーワード精度の側面を取り逃す。" },
    { t:"BM25 とベクトル検索を Reciprocal Rank Fusion で組み合わせるハイブリッド検索を使う", c:true, e:"正解。RRFを伴うハイブリッド検索はBM25とベクトル検索の結果集合を逆順位の和で組み合わせ、両方のリストに現れる文書を高く評価することでキーワード精度とセマンティック再現率のバランスを取る。" },
    { t:"仮想文書埋め込み (HyDE) を使って元のクエリを LLM が生成した架空の回答文に完全に置き換えてからベクトル検索する", c:false, e:"本来HyDEは高度なクエリ拡張手法だが、BM25とベクトル検索を同時に活用する仕組みではなく、本要件（精度とセマンティック再現率の両立）には直接対応しない。" }
  ],
  summary:"キーワード精度とセマンティック再現率の両立＝BM25+ベクトル検索のRRFハイブリッド検索。BM25単独/セマンティックランカー単独/HyDEはいずれも不十分。",
  keywords:[
    { k:"ハイブリッド検索と Reciprocal Rank Fusion（BM25 + ベクトル検索 + セマンティック ランカー）", d:"RRFハイブリッド検索の仕組み。" }
  ]
},
{
  id:"q214", domain:"genai", type:"multi", source:"Udemy AI-103",
  q:"ある機械学習エンジニアが Azure OpenAI モデルのファインチューニングを準備しています。Azure Foundry でのファインチューニングに関する次の記述のうち正しいものを2つ選んでください。",
  choices:[
    { t:"ファインチューニングは o1 推論モデルでも利用可能である", c:false, e:"本来Azure OpenAIではo1推論モデルのファインチューニングはサポートされていない。" },
    { t:"トレーニングデータは、チャット形式のメッセージからなる messages 配列を各行に含む JSONL 形式でなければならない", c:true, e:"正解。ファインチューニングのトレーニングデータはJSONL形式で、各行がチャット形式のmessages配列を持つJSONオブジェクトでなければならない（標準的な教師ありファインチューニングではuser/assistantのメッセージをrole/contentのペアで含み、systemは任意。ツール呼び出しの学習例ではcontentの代わりにtool_callsを持つassistantメッセージもあり、DPOやRFTなどの手法では必須ロールや追加フィールドの構成が異なる）。" },
    { t:"コスト効率の良いファインチューニングには GPT-4o mini が推奨される", c:true, e:"正解。GPT-4o miniはコスト効率の良いファインチューニングシナリオで明確に推奨されている。" },
    { t:"ドメイン固有の埋め込みを改善するため、text-embedding-3-large でもファインチューニングが利用可能である", c:false, e:"本来埋め込みモデルではファインチューニングは利用できない。text-embedding-3-largeのようなモデルは対象外。" },
    { t:"ファインチューニングのトレーニング ジョブは無料で実行でき、課金はデプロイ後のホスティングと推論に対してのみ発生する", c:false, e:"本来ファインチューニングはトレーニングジョブ自体にトレーニング時間やトークン量に基づく課金が発生する。課金がデプロイ後のホスティングと推論のみに限定されるという記述は誤り。" }
  ],
  summary:"ファインチューニング対応＝JSONL(messages配列)形式のデータ、GPT-4o miniがコスト効率良く推奨。o1・埋め込みモデルは非対応、トレーニング自体にも課金される。",
  keywords:[
    { k:"Azure OpenAI ファインチューニング（対応モデル・JSONL形式・DPO）", d:"対応モデルとデータ形式。" }
  ]
},
{
  id:"q215", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるMLOpsエンジニアが Azure OpenAI GPT-4o モデルをファインチューニングし、別途報酬モデルを学習させずに、承認された応答を拒否された応答より優先するようモデルに教える選好ベースのアラインメント手法でさらに改善したいと考えています。この選好ペア型ワークフローに合致するファインチューニング手法はどれですか？",
  choices:[
    { t:"JSONL 例を追加した教師ありファインチューニング (SFT)", c:false, e:"本来標準的な教師ありファインチューニング(SFT)は入力/出力ペアで学習するもので、好ましい/拒否された応答の選好ペアでは学習しない。" },
    { t:"Direct Preference Optimization (DPO) によるファインチューニング", c:true, e:"正解。DPOは選好ベースのファインチューニング手法で、別途報酬モデルを必要とせずに、好ましい応答と拒否された応答のペアから直接モデルを学習させる。Azure OpenAIはGPT-4oでのDPOをサポートしている。" },
    { t:"報酬モデルエンドポイントを使った Reinforcement Learning from Human Feedback (RLHF)", c:false, e:"本来RLHFは別途報酬モデルの学習を必要とする。DPOは特にそのステップを省略するシンプルな代替手法であり、本要件（報酬モデル不要）には合わない。" },
    { t:"学習率を下げて以前のチェックポイントから継続するインクリメンタルファインチューニング", c:false, e:"本来インクリメンタルファインチューニングは追加のラベル付き例を使って以前のチェックポイントからSFTを継続するものであり、選好ベースのアラインメントは行わない。" }
  ],
  summary:"報酬モデル不要の選好ペア学習＝DPO。SFTは入出力ペア学習、RLHFは別途報酬モデルが必要、インクリメンタルは単なるSFT継続。",
  keywords:[
    { k:"Azure OpenAI ファインチューニング（対応モデル・JSONL形式・DPO）", d:"DPO/SFT/RLHFの違い。" }
  ]
},
{
  id:"q216", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Foundry エージェントの run を作成し、その状態が 'requires_action' に変化しました。この状態は何を示していますか？",
  choices:[
    { t:"エージェントは正常に完了して 'completed' に遷移しており、最終的なアシスタントメッセージがスレッドに追加されて応答がそのまま利用可能になっている", c:false, e:"本来これは'completed'状態に対応する説明。requires_actionはまだ処理が完了しておらず、アプリケーション側の対応を待っている状態であるため異なる。" },
    { t:"エージェントの実行が失敗して 'failed' 状態に入っており、last_error に原因が記録され、再起動には開発者による手動介入と run の再作成が必要である", c:false, e:"本来これは'failed'状態に対応する説明。requires_actionは失敗ではなく、モデルが関数呼び出しを要求している正常な待機状態であるため異なる。" },
    { t:"モデルが関数ツールを呼び出すことを決定し、アプリケーションがツール結果を提供する必要がある", c:true, e:"正解。Foundry Agent Serviceではrequires_actionのrun状態は、モデルが関数呼び出しのツールアクションを発行することを決定したときに発生し、アプリケーションは関数を実行して結果を返さなければrunは継続できない。" },
    { t:"スレッドが許容コンテキスト長を超過したため自動トリミングが発生し、古いメッセージが切り詰められて 'incomplete' として処理が打ち切られたことを示している", c:false, e:"本来これはrunの状態条件として定義されているものではない。requires_actionはコンテキスト長超過とは無関係の、関数呼び出し待ちの状態である。" }
  ],
  summary:"requires_action＝モデルが関数ツール呼び出しを決定し、アプリの結果返却待ちの状態。completed/failed/コンテキスト超過とは別の状態。",
  keywords:[
    { k:"Foundry エージェント run のライフサイクル状態（queued/in_progress/requires_action/completed/failed）", d:"requires_actionの意味。" }
  ]
},
{
  id:"q217", domain:"agent", type:"multi", source:"Udemy AI-103", mono:true,
  q:"ある開発者が、最新情報を Web から取得し、データ分析を行うために Python コードを実行する必要がある Foundry エージェントの組み込みツールを構成しています。どの2つのツールを有効化すべきですか？",
  choices:[
    { t:"file_search", c:false, e:"本来これはアップロード済みファイルに対するセマンティック検索を有効化するツール。公開Web上の最新情報を取得するWebブラウジングの手段ではない。" },
    { t:"bing_grounding", c:true, e:"正解。bing_groundingはBing Search APIによるWeb検索を提供し、エージェントが最新の公開情報をインターネットから取得できるようにする。" },
    { t:"computer_use_preview", c:false, e:"本来これはブラウザとデスクトップ自動化を有効化するツールで、Web検索より広範な操作範囲を持つ。単純なWeb検索とPythonでのデータ分析という本要件には不要に大掛かり。" },
    { t:"code_interpreter", c:true, e:"正解。code_interpreterはサンドボックス環境でPythonを実行し、データ分析の出力を生成する。" },
    { t:"azure_ai_search", c:false, e:"本来これはAzure AI Searchインデックスからの検索を有効化するツールであり、公開Webブラウジングではない。" }
  ],
  summary:"最新Web情報取得+Pythonデータ分析＝bing_grounding＋code_interpreter。file_search/computer_use_preview/azure_ai_searchはいずれも目的が異なる。",
  keywords:[
    { k:"Foundry エージェントの組み込みツール一覧（bing_grounding / code_interpreter / file_search / openapi_v3 / 関数ツール）", d:"bing_groundingとcode_interpreterの役割。" }
  ]
},
{
  id:"q218", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある開発者が、エージェントのセマンティック検索で使用するために PDF 文書を Foundry Agent Service にアップロードします。どのツールとファイル構成の組み合わせを使うべきですか？",
  choices:[
    { t:"purpose='vision' でアップロードし、画像入力チャンネルを通じてスレッドメッセージに添付することで、エージェントが文書を視覚解析する", c:false, e:"本来purpose='vision'は視覚分析のために送られる画像ファイル用の用途であり、文書のセマンティック検索には使えない。" },
    { t:"purpose='assistants' でアップロードし、ベクトルストアに追加し、エージェントで file_search を有効化する", c:true, e:"正解。file_searchのためにファイルはassistants用途でアップロードされ、その後ベクトルストアに追加され、エージェントでfile_searchが有効化されている必要がある。Foundry Agent Serviceのfile_searchツールはベクトルストアオブジェクトを介して文書にアクセスする。" },
    { t:"purpose='assistants' でアップロードし、ベクトルストアを介さずにエージェント構成へファイル ID を直接添付して常時参照させる", c:false, e:"本来アップロード用途は正しいが、ベクトルストアなしでエージェントに直接添付してもセマンティック検索は有効にならない。" },
    { t:"purpose='batch' でアップロードし、バッチジョブ用のシステムプロンプト内でファイル ID を文字列として参照させて検索する", c:false, e:"本来purpose='batch'はAgent Serviceで認識されるファイル用途ではなく、システムプロンプト内でファイルIDを文字列参照する方法もfile_searchの仕組みとして機能しない。" }
  ],
  summary:"セマンティック検索用ファイル＝purpose='assistants'でアップロード+ベクトルストア追加+file_search有効化。vision/直接添付/batchはいずれも不適切。",
  keywords:[
    { k:"Foundry エージェントの組み込みツール一覧（bing_grounding / code_interpreter / file_search / openapi_v3 / 関数ツール）", d:"file_searchとベクトルストアの構成。" }
  ]
},
{
  id:"q219", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"Magentic-One のマルチエージェントアーキテクチャでは、サブエージェントが失敗に遭遇したときに進捗を追跡して再計画を行うためのタスク台帳を維持するコンポーネントはどれですか？",
  choices:[
    { t:"WebSurfer", c:false, e:"本来これはブラウザベースのWebリサーチに特化したサブエージェントであり、タスク台帳の管理は行わない。" },
    { t:"FileSurfer", c:false, e:"本来これはファイルシステムナビゲーションに特化したサブエージェントであり、オーケストレーションは行わない。" },
    { t:"Orchestrator エージェント", c:true, e:"正解。Magentic-OneではOrchestratorエージェントがタスクを分解し、特化型サブエージェントに指示を出し、進捗を追跡してサブエージェントが失敗に遭遇したときに再計画を可能にするタスク台帳を維持する。" },
    { t:"ComputerTerminal エージェント", c:false, e:"本来これはコマンドライン実行に特化したサブエージェントであり、オーケストレーションは行わない。" }
  ],
  summary:"タスク台帳を維持し進捗追跡・再計画を行う＝Orchestratorエージェント。WebSurfer/FileSurfer/ComputerTerminalはいずれも特化実行役。",
  keywords:[
    { k:"Magentic-One マルチエージェント アーキテクチャ（Orchestrator / WebSurfer / FileSurfer / Coder / ComputerTerminal）", d:"Orchestratorの役割。" }
  ]
},
{
  id:"q220", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"あるソリューションアーキテクトが、主要なリサーチエージェントが特化型データ抽出エージェントにサブタスクを委譲できるよう、2つの特化型 Foundry エージェントを構成したいと考えています。サブエージェントの内部実装は露出させたくありません。どのパターンを使うべきですか？",
  choices:[
    { t:"プライマリエージェントに、サブエージェントの REST エンドポイントを指す openapi_v3 ツールを構成する", c:false, e:"本来これは任意の外部REST APIを呼び出す有効なアプローチではあるが、ネイティブなconnected agentパターンを使うのではなく、サブエージェントのRESTインターフェースを露出することになり、実装詳細を隠したい本要件には合わない。" },
    { t:"プライマリエージェントに、サブエージェントの ID を指定した ConnectedAgentTool を構成する", c:true, e:"正解。FoundryのConnectedAgentToolパターンはプライマリエージェントが名前付きサブエージェントをツールとして呼び出せるようにし、Agent Serviceがリクエストをルーティングし、サブエージェントrunを実行して結果を返す。実装の詳細は露出されない。" },
    { t:"両方のエージェントが順次メッセージを投稿する共有スレッドを作成する", c:false, e:"本来これは構造化された委譲パターンではなく、明確なエージェント境界を作らないため、内部実装を隠したい本要件には不向き。" },
    { t:"Magentic-One の Orchestrator エージェントを2つのエージェント間の仲介役として使う", c:false, e:"本来これはネイティブなconnected agentパターンが直接処理できる場面に、不要な複雑性を持ち込む構成であり、最適な選択ではない。" }
  ],
  summary:"サブエージェントの内部実装を隠して委譲＝ConnectedAgentTool(サブエージェントIDを指定)。REST露出/共有スレッド/Orchestrator仲介はいずれも不向き。",
  keywords:[
    { k:"Foundry の Connected Agent パターン（ConnectedAgentTool）", d:"ConnectedAgentToolの動作。" }
  ]
},
{
  id:"q221", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある .NET 開発者が Microsoft Agent Framework を使い、固定のローテーションではなく会話の文脈に基づき次に発言するエージェントが動的に選ばれるマルチエージェントワークフローを構築しています。どのグループチャットパターンを使うべきですか？",
  choices:[
    { t:"RoundRobinGroupChat", c:false, e:"本来これは固定ローテーションで次の発言者を選ぶパターンであり、会話の文脈に適応しない。" },
    { t:"SelectorGroupChat", c:true, e:"正解。SelectorGroupChatはLLMを使って会話履歴に基づき次の発言者を動的に選択し、コーディネーター役が現在のタスク文脈に適応できるようにする。" },
    { t:"ProcessFramework のステートマシン", c:false, e:"本来これはステートマシンで定義される逐次ビジネスプロセスワークフロー向けのProcess Frameworkであり、動的な発言者選択の仕組みではない。" },
    { t:"コーディネーター用システムプロンプトを持つ AssistantAgent", c:false, e:"本来これは単一エージェントパターンであり、グループオーケストレーション機構ではない。" }
  ],
  summary:"会話文脈に応じ動的に発言者を選ぶ＝SelectorGroupChat。RoundRobinは固定ローテーション、ProcessFrameworkは逐次ワークフロー、単一AssistantAgentはオーケストレーション機構ではない。",
  keywords:[
    { k:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", d:"SelectorGroupChatの動的選択。" }
  ]
},
{
  id:"q222", domain:"agent", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある開発者が Python で Semantic Kernel プラグインメソッドを書き、自動的に JSON ツールスキーマに変換されて LLM に登録されるようにしたいと考えています。どのデコレータをメソッドに付与すべきですか？",
  choices:[
    { t:"@sk_function", c:false, e:"本来これは以前のバージョンのSemantic Kernelで使われていたデコレータであり、現在のPython SDKではkernel_functionデコレータを使う。" },
    { t:"@kernel_plugin", c:false, e:"本来これは有効なSemantic Kernelのデコレータではない。" },
    { t:"@kernel_function", c:true, e:"正解。Semantic KernelのPythonプラグインではメソッドにkernel_functionデコレータ(semantic_kernel.functionsからインポート)を付与して関数としてマークし、プラグインをカーネルへ追加したうえで関数呼び出しを有効化した実行設定(FunctionChoiceBehavior.Auto()など)でモデルを呼び出すと、ツールJSONスキーマへ変換されてLLMに公開される。" },
    { t:"@tool_schema", c:false, e:"本来これはSemantic Kernelのデコレータではない。" }
  ],
  summary:"Semantic KernelのPythonプラグインメソッドをツールスキーマ化＝@kernel_functionデコレータ。@sk_function/@kernel_plugin/@tool_schemaはいずれも実在しないか旧式。",
  keywords:[
    { k:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", d:"@kernel_functionデコレータ。" }
  ]
},
{
  id:"q223", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"あるMLOpsチームが Foundry エージェントの自動敵対的テストを実行し、プロンプトインジェクションや有害コンテンツのリクエストを正しく拒否することを検証したいと考えています。azure.ai.evaluation SDK のどのコンポーネントがこれをサポートしますか？",
  choices:[
    { t:"GroundednessEvaluator クラス", c:false, e:"本来これは応答の事実的グラウンディングを評価するクラスであり、敵対的入力への耐性は評価しない。" },
    { t:"敵対的シミュレーションモードの Simulator クラス", c:true, e:"正解。azure.ai.evaluationのSimulatorクラスは敵対的シミュレーションをサポートし、ジェイルブレイク試行・プロンプトインジェクション・有害コンテンツ要求に対してエージェントをテストし、コンテンツフィルターの効果を検証する。" },
    { t:"TaskCompletionEvaluator クラス", c:false, e:"本来これはエージェントがユーザー目標を達成したかを測定するクラスであり、敵対的堅牢性は測定しない。" },
    { t:"AgentRunRecorder クラス", c:false, e:"本来これはazure.ai.evaluation SDKに実在するクラスではない。" }
  ],
  summary:"プロンプトインジェクション/有害コンテンツへの耐性テスト＝Simulatorクラスの敵対的シミュレーション。Groundedness/TaskCompletionは別の品質軸を測る。",
  keywords:[
    { k:"prompt flow 組み込み評価器（Groundedness / Fluency / Coherence / Similarity）と Simulator", d:"Simulatorクラスの役割。" }
  ]
},
{
  id:"q224", domain:"agent", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある開発者が、評価のために完了したエージェント run のすべてのツールコールとその出力の詳細レコードを取得したいと考えています。Agent Service SDK のどのメソッドがこのデータを提供しますか？",
  choices:[
    { t:"AgentsClient.get_run(thread_id, run_id)", c:false, e:"本来これはrunの全体ステータスとメタデータを返すメソッドであり、個々のツールコールレコードは返さない。" },
    { t:"AgentsClient.list_messages(thread_id)", c:false, e:"本来これはスレッドの会話メッセージを返すメソッドであり、粒度の細かいツールコールステップは含まない。" },
    { t:"AgentsClient.list_run_steps(thread_id, run_id)", c:true, e:"正解。AgentsClient.list_run_steps()はrunステップレコードを提供し、各ツール名・入力引数・ツール出力・モデルの思考をタイムスタンプ付きで記録するため、評価の真実情報として機能する。" },
    { t:"AgentsClient.get_thread(thread_id)", c:false, e:"本来これはスレッドのメタデータを返すメソッドであり、runステップの詳細は返さない。" }
  ],
  summary:"runの全ツールコール詳細＝AgentsClient.list_run_steps(thread_id, run_id)。get_run/list_messages/get_threadはいずれも粒度不足。",
  keywords:[
    { k:"Foundry エージェント run のライフサイクル状態（queued/in_progress/requires_action/completed/failed）", d:"list_run_stepsによる観測。" }
  ]
},
{
  id:"q225", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるプラットフォームアーキテクトが、毎回 LLM を呼び出すのではなくセマンティックに類似する繰り返しクエリをキャッシュから提供することで、Azure OpenAI API のコストを削減したいと考えています。LLM コール用のセマンティックキャッシングを提供する Azure サービスはどれですか？",
  choices:[
    { t:"完全一致キーキャッシュを伴う Azure Cache for Redis", c:false, e:"本来これは完全一致の応答をキャッシュできるが、言い換えクエリのセマンティックマッチには対応しない。" },
    { t:"セマンティックキャッシング機能を持つ Azure API Management", c:true, e:"正解。Azure API Managementのセマンティックキャッシングは、ベクトル類似度を使ってセマンティックに類似するクエリをキャッシュ済み応答にルーティングし、LLMコールとコストを削減する。" },
    { t:"レスポンスキャッシュルールを持つ Azure Front Door", c:false, e:"本来これはエッジでHTTP応答をキャッシュする機能であり、セマンティック類似度マッチは行わない。" },
    { t:"データセットレベルでの prompt flow バッチ run キャッシング", c:false, e:"本来これは分析用にバッチrunの出力を記録する仕組みであり、本番推論のためのアクティブなキャッシング層ではない。" }
  ],
  summary:"言い換えクエリもキャッシュヒットさせLLMコール削減＝Azure API Managementのセマンティックキャッシング。Redis完全一致/Front Door/バッチキャッシングはいずれも不十分。",
  keywords:[
    { k:"セマンティック キャッシングと PTU スピルオーバー（コスト最適化）", d:"APIMのセマンティックキャッシング。" }
  ]
},
{
  id:"q226", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"ある企業が Azure OpenAI の PTU デプロイを運用しており、PTU 制限を超えるトラフィックスパイクをリクエスト失敗なしに処理したいと考えています。どの構成でこれを実現できますか？",
  choices:[
    { t:"別リージョンに2つ目の PTU デプロイを配置し、ジオルーティングを構成する", c:false, e:"本来これはリージョンを跨いだトラフィックルーティングロジックを別途必要とし、同一デプロイのオーバーフローを直接処理する仕組みではない。" },
    { t:"超過トラフィックを従量課金デプロイへルーティングするスピルオーバーを構成する", c:true, e:"正解。スピルオーバー構成は、PTU利用率が100%を超えた際に超過トラフィックを従量課金デプロイへルーティングし、リクエスト失敗を防ぎつつベースロードでは予測可能なコストを維持する。" },
    { t:"ピーク負荷を常時カバーできるよう PTU 予約サイズを増やす", c:false, e:"本来これは大半の使用期間で過剰プロビジョニングとなり、オーバーフロー処理機構としては非効率。" },
    { t:"マネージドオンラインエンドポイントで自動スケーリングを有効化し、PTU 容量を動的に追加する", c:false, e:"本来PTU容量は予約割り当てであり、動的に自動スケーリングされる仕組みではない。" }
  ],
  summary:"PTU上限超過トラフィックを失敗させずに処理＝従量課金デプロイへのスピルオーバー構成。ジオルーティング/予約増量/自動スケーリングはいずれも代替にならない。",
  keywords:[
    { k:"セマンティック キャッシングと PTU スピルオーバー（コスト最適化）", d:"PTUスピルオーバー構成。" }
  ]
},
{
  id:"q227", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"ある Foundry エージェントが外部 REST API を呼び出すよう構成されています。Foundry Agent Service の中で外部 REST エンドポイントを呼び出せるツール種別はどの2つですか？",
  choices:[
    { t:"code_interpreter", c:false, e:"本来これはサンドボックスでPythonコードを実行するツールであり、独立したツール種別として外部REST APIをネイティブに呼び出すものではない。" },
    { t:"openapi_v3", c:true, e:"正解。openapi_v3ツールはOpenAPI 3.0仕様で定義された外部REST APIを呼び出す。" },
    { t:"bing_grounding", c:false, e:"本来これはBing Web検索用のツールであり、任意のREST APIコールを行うものではない。" },
    { t:"JSON スキーマで定義されたカスタム関数ツール", c:true, e:"正解。カスタム関数ツールはJSONスキーマとして定義され、エージェントが関数呼び出しアクションを発行し、アプリケーションコードが任意のターゲットエンドポイント(外部REST APIを含む)に対して実行する。" },
    { t:"file_search", c:false, e:"本来これはアップロード済みファイルに対するセマンティック検索用のツールである。" }
  ],
  summary:"外部RESTエンドポイントの呼び出し＝openapi_v3ツール＋JSONスキーマのカスタム関数ツール。code_interpreter/bing_grounding/file_searchはいずれも別目的。",
  keywords:[
    { k:"Foundry エージェントの組み込みツール一覧（bing_grounding / code_interpreter / file_search / openapi_v3 / 関数ツール）", d:"openapi_v3と関数ツール。" }
  ]
},
{
  id:"q228", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"Microsoft の Magentic-One マルチエージェントシステムにおいて、サブエージェントとその主要機能の対応として正しい記述をすべて選びなさい。",
  choices:[
    { t:"WebSurfer → ブラウザベースの Web リサーチとページナビゲーションを行う", c:true, e:"正解。WebSurfer: ブラウザベースのWebリサーチとページナビゲーションを行う。" },
    { t:"Coder → サンドボックス環境で Python などのコードを実行する", c:true, e:"正解。Coder: サンドボックス環境でPythonなどのコードを実行する。" },
    { t:"FileSurfer → システムレベルの操作のためにコマンドラインシェルコマンドを実行する", c:false, e:"本来この説明はFileSurferではなくComputerTerminalに対応する。FileSurferの正しい役割はローカルファイルシステム上のファイルをナビゲートして読み取ること。" },
    { t:"ComputerTerminal → ローカルファイルシステム上のファイルをナビゲートして読み取る", c:false, e:"本来この説明はComputerTerminalではなくFileSurferに対応する。ComputerTerminalの正しい役割はシステムレベルの操作のためにコマンドラインシェルコマンドを実行すること。" },
    { t:"FileSurfer → ローカルファイルシステム上のファイルをナビゲートして読み取る", c:true, e:"正解。FileSurfer: ローカルファイルシステム上のファイルをナビゲートして読み取る。" },
    { t:"WebSurfer → サンドボックス環境で Python などのコードを実行する", c:false, e:"本来この説明はWebSurferではなくCoderに対応する。WebSurferの正しい役割はブラウザベースのWebリサーチとページナビゲーションを行うこと。" }
  ],
  summary:"Magentic-Oneのサブエージェント役割＝WebSurfer(Webリサーチ)/Coder(Python実行)/FileSurfer(ファイル読取)/ComputerTerminal(シェルコマンド)。役割の取り違えに注意。",
  keywords:[
    { k:"Magentic-One マルチエージェント アーキテクチャ（Orchestrator / WebSurfer / FileSurfer / Coder / ComputerTerminal）", d:"各サブエージェントの役割対応。" }
  ]
},
{
  id:"q229", domain:"knowledge", type:"multi", source:"Udemy AI-103",
  q:"Azure AI Search において、検索・ランキングの概念とその説明の対応として正しい記述をすべて選びなさい。",
  choices:[
    { t:"BM25 → 単語頻度と逆文書頻度に基づいて文書を取得する", c:true, e:"正解。BM25: 単語頻度と逆文書頻度に基づいて文書を取得する。" },
    { t:"ベクトル検索 (HNSW) → グラフベースのインデックスを使ってセマンティック類似性の近似最近傍を見つける", c:true, e:"正解。ベクトル検索(HNSW): グラフベースのインデックスを使ってセマンティック類似性の近似最近傍を見つける。" },
    { t:"Reciprocal Rank Fusion (RRF) → 逆順位の和でランク済み結果リストをマージし、複数のリストに現れる文書を高く評価する", c:true, e:"正解。Reciprocal Rank Fusion(RRF): 逆順位の和でランク済み結果リストをマージし、複数のリストに現れる文書を高く評価する。" },
    { t:"セマンティックランカー → クロスエンコーダーモデルで上位結果を再ランキングし、0〜4 スケールの rerankerScore を返す", c:true, e:"正解。セマンティックランカー: クロスエンコーダーモデルで上位結果を再ランキングし、0〜4スケールのrerankerScoreを返す。" },
    { t:"BM25 → グラフベースのインデックスを使ってセマンティック類似性の近似最近傍を見つける", c:false, e:"本来この説明はBM25ではなくベクトル検索(HNSW)に対応する。BM25の正しい説明は単語頻度と逆文書頻度に基づく文書取得。" },
    { t:"セマンティックランカー → 逆順位の和でランク済み結果リストをマージし、複数のリストに現れる文書を高く評価する", c:false, e:"本来この説明はセマンティックランカーではなくReciprocal Rank Fusion(RRF)に対応する。セマンティックランカーの正しい説明はクロスエンコーダーモデルによる再ランキング。" }
  ],
  summary:"Azure AI Searchの検索・ランキング概念＝BM25(語彙一致)/ベクトル検索(意味的近傍)/RRF(結果マージ)/セマンティックランカー(再ランキング)。役割の取り違えに注意。",
  keywords:[
    { k:"ハイブリッド検索と Reciprocal Rank Fusion（BM25 + ベクトル検索 + セマンティック ランカー）", d:"BM25/ベクトル検索/RRF/セマンティックランカーの対応。" }
  ]
},
{
  id:"q230", domain:"knowledge", type:"multi", source:"Udemy AI-103",
  q:"ある開発者が Azure AI Search で本番 RAG インデックススキーマを設計しています。標準的な RAG 実装でインデックススキーマに必須となるフィールドを2つ選んでください。",
  choices:[
    { t:"生のチャンクコンテンツ用のテキストフィールド", c:true, e:"正解。生のチャンクコンテンツ用のテキストフィールドはBM25キーワード検索と、グラウンディング文脈としてLLMにチャンクテキストを返すために必須。" },
    { t:"埋め込みモデルの次元と一致する Collection(Edm.Single) 型のベクトルフィールド", c:true, e:"正解。埋め込みモデルの次元と一致するCollection(Edm.Single)型のベクトルフィールドはベクトル検索に必要。" },
    { t:"地理空間的な文書位置フィルタリング用のジオメトリフィールド", c:false, e:"本来これは地理空間ユースケース用のフィールドであり、標準的なRAGスキーマ設計には含まれない。" },
    { t:"文書を有効/無効としてフラグ付けするブールフィールド", c:false, e:"本来これはフィルタリングに有用な運用フィールドではあるが、RAG検索スキーマには必須ではない。" },
    { t:"主キー文書 ID 用の整数フィールド", c:false, e:"本来Azure AI Searchのキーフィールドは Edm.String 型でなければならず整数型は指定できない。また主キーはインデックス全般に必要な要素であって、本問が問うRAG固有の必須フィールドではない。" }
  ],
  summary:"標準的なRAGインデックススキーマの必須要素＝生テキストフィールド＋ベクトルフィールド。ジオメトリ/ブール/整数キーはRAG固有の必須要素ではない。",
  keywords:[
    { k:"ハイブリッド検索と Reciprocal Rank Fusion（BM25 + ベクトル検索 + セマンティック ランカー）", d:"RAGインデックスの必須フィールド。" }
  ]
}

]);
