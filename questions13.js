/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ13 (q276-q295)
 *  出典: Udemy掲載のAI-103対策講座（ユーザー提供の20問を再構成、第5弾）。
 *  source:"Udemy AI-103" を付与。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q276", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるチームがプロンプトフローの評価を構成しています。RAG 中に検索したナレッジベース記事と一貫した応答かどうかを評価し、検索コンテキストに存在しない事実を導入する応答にペナルティを課したいと考えています。使用すべき組み込み評価指標と、モデル応答以外の主要な入力は何ですか？",
  choices:[
    { t:"Relevance 評価指標。主要な入力はユーザーの元の質問", c:false, e:"本来Relevanceは応答が質問に答えているかを測定するものであり、検索コンテキストによる事実上の裏付けはチェックしない。" },
    { t:"Groundedness 評価指標。主要な入力は検索コンテキスト (グラウンディング文書)", c:true, e:"正解。Groundednessは、モデルの応答が提供されたグラウンディング文書によって裏付けられているかを測定するもので、検索コンテキストに存在しない事実を導入する応答にペナルティを課すという要件に直接対応する。モデル応答以外の主要な入力は検索コンテキスト(グラウンディングとして注入される文書チャンク)。" },
    { t:"Similarity 評価指標。主要な入力は整備されたテストセットの参照応答", c:false, e:"本来Similarityは整備されたテストセットの参照応答に対する埋め込み距離を測定し、表現の類似度を見るもので事実上のグラウンディングではない。" },
    { t:"Coherence 評価指標。主要な入力は会話履歴", c:false, e:"本来Coherenceは構造的な品質を測定するものであり、事実上の正確性やグラウンディングは測らない。" }
  ],
  summary:"検索コンテキストとの事実的一貫性(RAG幻覚対策)＝Groundedness評価指標、主要入力は検索コンテキスト。Relevance/Similarity/Coherenceはいずれも別の品質軸を測る。",
  keywords:[
    { k:"生成品質メトリクス（Groundedness / Groundedness Pro / Relevance / Coherence / Fluency / Similarity）", d:"Groundednessの測定対象と主要入力。" }
  ]
},
{
  id:"q277", domain:"genai", type:"multi", source:"Udemy AI-103",
  q:"ある開発チームが、Foundry の Add Your Data 機能を使用して RAG パイプラインを構築しています。インデックス作成ワークフローで、ソース文書を埋め込み前にチャンク分割する方法を制御するために構成可能なパラメーターを2つ選んでください。",
  choices:[
    { t:"chunk_size — 各チャンクの最大文字数またはトークン長を制御する", c:true, e:"正解。chunk_sizeは各チャンクの最大文字数またはトークン長を制御するチャンク分割パラメーターであり、埋め込み前のチャンク分割方法を構成できる。" },
    { t:"chunk_overlap — 隣接するチャンク間で共有される文字数/トークン数を制御する", c:true, e:"正解。chunk_overlapは隣接するチャンク間で共有される文字数/トークン数を制御するチャンク分割パラメーターであり、境界部分のテキストを繰り返してチャンク間の連続性を確保する。" },
    { t:"k (top-k 検索件数) — 1 クエリあたりに返されるチャンク数を制御する", c:false, e:"本来検索のkパラメーターは1クエリあたりに返されるチャンク数を決定するもので、検索を制御するものでありチャンク分割を制御するものではない。" },
    { t:"scoringProfile — BM25 の用語頻度スコアの重み付けを制御する", c:false, e:"本来scoringProfileはBM25の関連度の重み付けを調整するもので、文書分割は行わない。" },
    { t:"埋め込みモデルの次元数 — 各チャンク埋め込みのベクトルサイズを制御する", c:false, e:"本来埋め込みモデルの次元数はモデルの選択によって決まる固定値であり、チャンク分割のパラメーターではない。" }
  ],
  summary:"Add Your Dataのチャンク分割制御＝chunk_size(最大長)＋chunk_overlap(重複)。k/scoringProfile/埋め込み次元数はいずれもチャンク分割パラメーターではない。",
  keywords:[
    { k:"Add Your Data のチャンク分割パラメーター（chunk_size / chunk_overlap）", d:"chunk_sizeとchunk_overlapの役割。" }
  ]
},
{
  id:"q278", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるチームの RAG パイプラインはキーワードベースの BM25 検索を使用していますが、インデックス済みドキュメントとは異なる用語 (例: 'automobile' と 'car') を含む質問では検索品質が低下します。チームは、製品コードのような完全一致に対する BM25 のキーワード精度を犠牲にすることなく、セマンティック再現率を改善したいと考えています。推奨される検索戦略はどれですか？",
  choices:[
    { t:"コサイン類似度を用いた純粋なベクトル検索に完全に切り替え、BM25 のインデックスを破棄して語彙一致のスコアリングを停止する", c:false, e:"本来ベクトル検索のみへの完全切替は、製品コードのような完全一致のキーワード精度を失わせる。" },
    { t:"Reciprocal Rank Fusion により BM25 とベクトル検索を組み合わせるハイブリッド検索を有効化する", c:true, e:"正解。RRFを用いたハイブリッド検索は、BM25が製品コードなどの完全一致精度を維持しつつ、ベクトル検索が'automobile'/'car'のようなセマンティックな同義語を捉え、両方のランク付き結果を統合する。" },
    { t:"BM25 のチューニングパラメータ k1 と b を増やして用語頻度の重み付けを強化し、語彙の出現回数に対する感度をさらに高める", c:false, e:"本来BM25パラメータのチューニングはセマンティックギャップに対応せず、用語頻度・ドキュメント長正規化を調整するだけ。" },
    { t:"想定されるすべての用語ペアごとに Azure AI Search インデックスへシノニムマップを手動で追加し、同義語を網羅的に登録する", c:false, e:"本来シノニムマップは有効だが、用語ペアごとの手動メンテナンスが必要であり、ベクトル検索なら自動的にセマンティック類似性を扱える。" }
  ],
  summary:"完全一致精度を保ちつつセマンティック再現率を改善＝BM25+ベクトル検索のRRFハイブリッド検索。ベクトル検索単独切替/BM25パラメータ調整/シノニムマップ手動登録はいずれも本要件に不十分。",
  keywords:[
    { k:"ハイブリッド検索と Reciprocal Rank Fusion（BM25 + ベクトル検索 + セマンティック ランカー）", d:"BM25パラメータ/シノニムマップとRRFの比較。" }
  ]
},
{
  id:"q279", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるチームは、自社特有のスタイルで商品説明を生成するために GPT-4o mini をファインチューニングしています。学習データセットは80件のサンプルで構成されています。チームは学習中にモデルが過学習していないかを監視したいと考えています。過学習の検知を有効化するために、ファインチューニングジョブにどのアーティファクトを提供すべきですか？",
  choices:[
    { t:"ベースモデル用のシステムプロンプトファイル", c:false, e:"本来システムプロンプトは学習動態の監視には役立たない。" },
    { t:"ホールドアウトサンプルを含む JSONL 形式の検証ファイル", c:true, e:"正解。ホールドアウト検証用JSONLファイルをファインチューニングジョブに提供すると、Foundryポータルが学習損失と並んで設定可能なエポック間隔で検証損失を報告できるようになる。学習損失が下がる一方で検証損失が上昇または横ばいになった場合、モデルは過学習している。" },
    { t:"既存の商品説明を含む Azure AI Search インデックス", c:false, e:"本来AI Searchインデックスは推論時のRAG検索に使用されるものであり、ファインチューニング評価には使われない。" },
    { t:"Foundry ポータルの評価フロー定義", c:false, e:"本来評価フローフレームワークは学習完了後にモデル出力を比較するためのものであり、学習ループ自体の中では使われない。" }
  ],
  summary:"ファインチューニング中の過学習監視＝ホールドアウトサンプルを含むJSONL検証ファイル(training lossとvalidation lossの乖離で判定)。システムプロンプト/AI Searchインデックス/評価フロー定義はいずれも学習ループの監視手段ではない。",
  keywords:[
    { k:"Azure OpenAI ファインチューニング（対応モデル・JSONL形式・DPO）", d:"ホールドアウト検証ファイルによる過学習監視。" }
  ]
},
{
  id:"q280", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"ある企業が GPT-4o mini をファインチューニングし、ファインチューニング済みモデルをマネージドエンドポイントとしてデプロイしました。3か月後、最近追加された製品ラインから500件の新しい学習サンプルを追加することになりました。ML エンジニアは、これまで学習したスタイルを保持するために、GPT-4o mini ベースから再学習し直すのではなく、ファインチューニング済みモデルを更新して新サンプルを取り込みたいと考えています。どのファインチューニング手法を使用すべきですか？",
  choices:[
    { t:"GPT-4o mini ベースから合計580件のサンプルすべてで再学習する", c:false, e:"本来既存のファインチューニング済みモデルチェックポイントから新しい学習データで学習を再開すれば、最初の学習で得られたスタイルやドメイン知識を保持したままでよく、ベースモデルから再開する必要がない。" },
    { t:"増分ファインチューニング (既存のファインチューニング済みチェックポイント上での継続学習)", c:true, e:"正解。増分ファインチューニング(既存のファインチューニング済みチェックポイント上での継続学習)は、Azure OpenAIファインチューニングで明示的にサポートされている。580件すべてでフル再学習するより高速かつコスト効率に優れる。" },
    { t:"既存デプロイに対して LoRA アダプタで新サンプルをマージする", c:false, e:"本来LoRAアダプタのマージはAzure OpenAIファインチューニングサービスではサポートされていない。" },
    { t:"システムプロンプトに500件の新サンプルを追加してプロンプトキャッシュを使う", c:false, e:"本来プロンプトキャッシュは新しいサンプルをモデルに学習させるものではなく、繰り返されるプレフィックスのレイテンシを減らすだけ。" }
  ],
  summary:"既存スタイルを保持しつつ新サンプルを追加学習＝増分ファインチューニング(既存チェックポイントからの継続学習)。全量再学習/LoRAマージ/システムプロンプト追加はいずれも本要件に合わない。",
  keywords:[
    { k:"Azure OpenAI ファインチューニング（対応モデル・JSONL形式・DPO）", d:"増分ファインチューニングとLoRA非対応。" }
  ]
},
{
  id:"q281", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"Foundry エージェントの実行が、組み込みツール (code_interpreter、file_search) とカスタム関数ツール (inventory_lookup) の両方で構成されています。実行中、モデルは inventory_lookup を呼び出すことを決定しました。この時点で発生する内容を正しく説明している記述を2つ選んでください。",
  choices:[
    { t:"実行ステータスが 'requires_action' に遷移し、アプリケーションが関数結果を送信するまで一時停止する", c:true, e:"正解。Foundryエージェントがカスタム関数ツールを呼び出すと、実行は'requires_action'に遷移し、アプリケーションが外部で関数を実行して結果を返すのを待って一時停止する。" },
    { t:"Agent Service がアプリケーションの関与なしにカスタム関数を自動実行する", c:false, e:"本来code_interpreterやfile_searchのような組み込みツールはAgent Service内で実行されrequires_actionは発生しないが、カスタム関数ツールは常にこのパターンを必要とする。" },
    { t:"アプリケーションは実行を再開するためにツール出力を伴う submit_tool_outputs_to_run() を呼び出す必要がある", c:true, e:"正解。アプリケーションはtool_call_idと出力文字列を含めてsubmit_tool_outputs_to_runを呼び出し、関数結果を提供して実行を再開する必要がある。" },
    { t:"関数呼び出しアクションを発行した後、実行ステータスが 'completed' に遷移する", c:false, e:"本来Foundryエージェントがカスタム関数ツールを呼び出すと、実行は'requires_action'に遷移し、アプリケーションが外部で関数を実行して結果を返すのを待って一時停止する。" },
    { t:"30 秒のタイムアウト後、モデルが関数呼び出しを自動的にリトライする", c:false, e:"本来30秒の自動リトライは存在せず、実行はアプリケーションが応答するまでrequires_actionのままとなる。" }
  ],
  summary:"カスタム関数ツール呼び出し時の挙動＝requires_actionへ遷移して一時停止＋submit_tool_outputs_to_run()での結果送信が必須。自動実行/completedへの直接遷移/30秒自動リトライはいずれも誤り。",
  keywords:[
    { k:"Foundry エージェント run のライフサイクル状態（queued/in_progress/requires_action/completed/failed）", d:"カスタム関数ツール呼び出し時のrequires_action。" }
  ]
},
{
  id:"q282", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"Foundry エージェントがカスタマーサポートアシスタント向けに構成されています。(1) アップロード済み製品マニュアルの検索、(2) カスタム価格計算式を必要時に実行するための Python 実行、という2つのニーズを最もよくカバーする Agent Service の組み込みツールを2つ選んでください。",
  choices:[
    { t:"file_search — ベクトルストアにアップロードされたファイルに対するセマンティック検索を実行する", c:true, e:"正解。file_searchは、ベクトルストアに整理されてアップロードされたファイルに対してセマンティック検索を行うために設計された組み込みツールであり、アップロード済み製品マニュアルの検索という要件を直接満たす。" },
    { t:"code_interpreter — サンドボックス環境で Python コードを実行する", c:true, e:"正解。code_interpreterはサンドボックス環境でPythonを実行し、データやファイルを出力できるため、カスタム価格計算式の処理を直接カバーする。" },
    { t:"bing_grounding — Bing 経由でリアルタイム Web 検索を実行する", c:false, e:"本来bing_groundingはリアルタイムWeb検索向けであり、ファイル検索向けではない。" },
    { t:"computer_use_preview — ブラウザ操作を自動化する", c:false, e:"本来computer_use_previewはブラウザやデスクトップ操作を自動化するものであり、本ユースケースには不要。" },
    { t:"openapi_v3 — OpenAPI 仕様で定義された外部 REST API を呼び出す", c:false, e:"本来openapi_v3は外部REST APIを呼び出すものであり、組み込みツールで両要件を満たせる中で不要な複雑さを追加することになる。" }
  ],
  summary:"製品マニュアル検索+カスタム計算式のPython実行＝file_search＋code_interpreter。bing_grounding/computer_use_preview/openapi_v3はいずれも目的が異なるか不要。",
  keywords:[
    { k:"Foundry エージェントの組み込みツール一覧（bing_grounding / code_interpreter / file_search / openapi_v3 / 関数ツール）", d:"file_searchとcode_interpreterの組み合わせ。" }
  ]
},
{
  id:"q283", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある チームが Magentic-One マルチエージェントシステムを実装しています。Orchestrator エージェントは、複数の Web サイトを閲覧してコンテンツを抽出し、Python 解析スクリプトを書き、それを実行する長時間にわたるリサーチを実行する必要があります。これら3つの機能をすべてカバーする Magentic-One サブエージェントの組み合わせはどれですか？",
  choices:[
    { t:"WebSurfer + ComputerTerminal のみ", c:false, e:"本来WebSurfer + ComputerTerminalだけではコード記述機能が欠ける。" },
    { t:"WebSurfer + FileSurfer + Coder", c:false, e:"本来FileSurferはファイルシステムをナビゲートするものであり、Webブラウジングには必要ない。" },
    { t:"WebSurfer + Coder + ComputerTerminal", c:true, e:"正解。WebSurfer(Webサイトを閲覧してコンテンツを抽出するブラウザベースのWebリサーチ)、Coder(Python解析スクリプトを記述)、ComputerTerminal(コマンドラインでスクリプトを実行)。" },
    { t:"FileSurfer + Coder + ComputerTerminal", c:false, e:"本来FileSurferはファイルシステムをナビゲートするものであり、Webブラウジングには必要ない。" }
  ],
  summary:"Web閲覧+コード記述+実行の3機能＝WebSurfer+Coder+ComputerTerminal。FileSurferはファイルナビゲーション専用でWeb閲覧には不要。",
  keywords:[
    { k:"Magentic-One マルチエージェント アーキテクチャ（Orchestrator / WebSurfer / FileSurfer / Coder / ComputerTerminal）", d:"3機能をカバーするサブエージェントの組み合わせ。" }
  ]
},
{
  id:"q284", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"Foundry のソリューションアーキテクトは、主要な 'Router' エージェントがユーザーリクエストを受け取り、専門タスクを 'DataAnalysis' エージェントと 'Compliance' エージェントへ委譲し、各サブエージェントが独立に実行されて結果を Router へ返すパイプラインを構築したいと考えています。サブエージェントは互いの実装を認識すべきではありません。最小の構成オーバーヘッドでこれを実現する Foundry Agent Service のパターンはどれですか？",
  choices:[
    { t:"各サブエージェントが公開する REST エンドポイントを openapi_v3 ツール定義として記述し、その複数のツールスキーマをまとめて Router エージェントに構成して HTTP 経由で呼び出させる", c:false, e:"本来openapi_v3は各サブエージェントをRESTエンドポイントとしてデプロイする必要があり、デプロイのオーバーヘッドが増える。" },
    { t:"ConnectedAgentTool を使い、DataAnalysis と Compliance サブエージェントの ID を Router エージェントに構成する", c:true, e:"正解。Foundry Agent ServiceのConnectedAgentToolを使うと、主要エージェントにサブエージェントのIDと説明を構成できる。主要エージェントがツールを呼び出すと、Agent Serviceがサブエージェントのスレッドへルーティングし、実行を行い結果を返却する。これらすべてが同一Foundryプロジェクト内で完結し、サブエージェントはIDと説明のみを公開する。" },
    { t:"Router エージェントに code_interpreter ツールを有効化し、サンドボックス内の Python SDK セッションから各サブエージェントのクライアントを生成して順番に呼び出させ、結果を集約させる", c:false, e:"本来code_interpreterからSDK経由でサブエージェントを呼び出すのは非標準的なパターンで、可観測性も劣る。" },
    { t:"3 つのエージェントをそれぞれ独立した別々の Foundry プロジェクトとしてデプロイし、Azure Service Bus のキューを介して相互にメッセージを非同期で受け渡しさせて連携させる", c:false, e:"本来これらすべてが同一Foundryプロジェクト内で完結する構成であり、Azure Service Busは不要なインフラの複雑さを追加する。" }
  ],
  summary:"サブエージェントの実装を互いに隠しつつ最小オーバーヘッドで委譲＝ConnectedAgentToolでサブエージェントIDを構成。openapi_v3/code_interpreter経由SDK呼び出し/Service Busはいずれもオーバーヘッド過大。",
  keywords:[
    { k:"Foundry の Connected Agent パターン（ConnectedAgentTool）", d:"ConnectedAgentToolによる最小オーバーヘッドの委譲。" }
  ]
},
{
  id:"q285", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある .NET 開発者が Microsoft Agent Framework を使ってマルチエージェント方式のドキュメントレビューパイプラインを構築しています。パイプラインは3段階に分かれています。Author エージェントが下書きを作成し、Reviewer エージェントが批評し、Approver エージェントが合否の二値判定を行います。各段階は厳密な順序で実行され、各段階の出力が次の段階に渡される必要があります。このワークフローのモデル化に最も適した Agent Framework の抽象化はどれですか？",
  choices:[
    { t:"RoundRobinGroupChat — エージェントが固定順で交代する", c:false, e:"本来RoundRobinGroupChatは固定順で交代するが、段階の遷移や段階間でのデータ受け渡しを構造的にモデル化しない。" },
    { t:"SelectorGroupChat — LLM が次の発話者を動的に選択する", c:false, e:"本来SelectorGroupChatは動的なLLM選択を使用するが、固定の逐次パイプラインに対しては不要なオーバーヘッド。" },
    { t:"Workflows の Sequential orchestration — 各エージェントが前段の出力を受け取り、固定された順序で逐次実行される", c:true, e:"正解。WorkflowsのSequential orchestrationは、各エージェントが前段の出力を受け取って固定順に逐次実行される構成をモデル化し、Author→Reviewer→Approverのような決定的な逐次パイプラインに最適。" },
    { t:"各段階に関数呼び出しを行う AutoGen の単一エージェント", c:false, e:"本来AutoGenの単一エージェントでは、希望するエージェント特化が得られない。" }
  ],
  summary:"厳密な順序で前段出力を次段へ渡す決定的パイプライン＝WorkflowsのSequential orchestration。RoundRobin/Selectorは会話系オーケストレーション、単一エージェントは特化が得られない。",
  keywords:[
    { k:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", d:"Sequential orchestrationによる決定的パイプライン。" }
  ]
},
{
  id:"q286", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある Python 開発者が、Azure AI Search 用の Semantic Kernel プラグインを構築しています。プラグインの search メソッドは、LLM が呼び出せるツールとして自動的に利用可能になる必要があります。LLM が利用できるツールの JSON スキーマに Python メソッドを変換する SK の仕組みはどれですか？",
  choices:[
    { t:"KernelArguments ディクショナリにメソッドを登録する", c:false, e:"本来KernelArgumentsはオーケストレーション全体で受け渡されるデータ構造であり、ツールを登録するものではない。" },
    { t:"メソッドに @kernel_function を装飾する", c:true, e:"正解。Semantic Kernelでは、プラグインメソッドは@kernel_function(Python)または[KernelFunction]属性(C#)で装飾される。この装飾はSKにメソッドシグネチャ、docstring、パラメータ注釈を自動的にJSONツールスキーマへ変換するよう指示する。" },
    { t:"ChatHistory をサブクラス化し tool_calls プロパティをオーバーライドする", c:false, e:"本来ChatHistoryは会話メッセージを保持するものであり、ツール登録の仕組みは持たない。" },
    { t:"プラグインを Foundry モデルカタログに公開する", c:false, e:"本来モデルカタログへの公開はモデルデプロイ操作であり、プラグイン関数の登録とは無関係。" }
  ],
  summary:"PythonメソッドをLLM向けJSONツールスキーマへ変換＝@kernel_functionデコレータ(C#は[KernelFunction]属性)。KernelArguments/ChatHistory/モデルカタログ公開はいずれもツール登録の仕組みではない。",
  keywords:[
    { k:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", d:"@kernel_function/[KernelFunction]によるツール変換。" }
  ]
},
{
  id:"q287", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"あるチームが、カスタマーサポートチケットを処理する Foundry エージェントの本番監視を構築しています。サービス劣化と異常な振る舞いの両方についてアラートを受けたいと考えています。Application Insights のエージェントテレメトリで直接サポートされているアラート条件を2つ選んでください。",
  choices:[
    { t:"ツールエラー率がしきい値を超える (失敗したツール呼び出しが総呼び出し数に対して占める割合)", c:true, e:"正解。ツールエラー率(失敗したツール呼び出しの割合)は、Foundry Agentの評価・監視ドキュメントがエージェント実行のアラートルールに使用できるApplication Insightsメトリックとして明示的に挙げているもの。" },
    { t:"コンテンツフィルター発動率がベースラインを超える (安全フィルターによってブロックされた応答の割合)", c:false, e:"本来コンテンツフィルター発動率は診断設定で利用可能なContent Safetyメトリックであり、エージェント実行テレメトリのアラート条件とは別に列挙されている。" },
    { t:"エージェントの課金額が月次予算を超える", c:false, e:"本来課金予算アラートはAzure Cost Managementに属しており、Application Insightsではない。" },
    { t:"完了タスクあたりのトークン消費量がローリング平均を急激に上回る", c:true, e:"正解。Foundry Agentの評価・監視ドキュメントは、エージェント実行のアラートルールに使用できるApplication Insightsメトリックとして、ツールエラー率と完了タスクあたりのトークン消費量を明示的に挙げている。" },
    { t:"同時 Azure Blob Storage トランザクション数がクォータを超える", c:false, e:"本来Blob Storageのトランザクションクォータは Azure Storageのメトリックであり、エージェントテレメトリの次元ではない。" }
  ],
  summary:"エージェント実行テレメトリのアラート条件＝ツールエラー率(サービス劣化)＋完了タスクあたりトークン消費量(異常な振る舞い)。コンテンツフィルター発動率/課金額/Blob Storageトランザクション数はいずれも別分類。",
  keywords:[
    { k:"Foundry エージェントの Application Insights テレメトリ アラート指標（ツールエラー率/完了タスクあたりトークン消費量）", d:"2つの主要アラート指標。" }
  ]
},
{
  id:"q288", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"ある QA エンジニアが、本番ユーザーへリリースする前に Foundry エージェントのプロンプトインジェクションや有害コンテンツ要求への耐性をテストしたいと考えています。この敵対的テストを自動化する azure.ai.evaluation の機能はどれですか？",
  choices:[
    { t:"手動でキュレートされた敵対的 JSONL データセットを使うバッチ評価器", c:false, e:"本来手動でキュレートしたJSONLデータセットは労力がかかり、すべての敵対的パターンを網羅できる可能性は低く、自動化された敵対的テストにはならない。" },
    { t:"ジェイルブレイクと有害コンテンツのシナリオを持つ Simulator クラスを用いた敵対的シミュレーション", c:true, e:"正解。敵対的シミュレーションは、ジェイルブレイク試行、プロンプトインジェクション、有害コンテンツ要求に対してエージェントをテストし、コンテンツフィルターやシステムプロンプトのガードレールが有効であることを検証する。敵対的会話スレッドが自動生成される。" },
    { t:"azure.ai.contentsafety の AnalyzeText API をエージェント出力に対して呼び出す", c:false, e:"本来AnalyzeTextは個々のテキストスニペットを審査するものであり、複数ターンのエージェント敵対的会話をシミュレートしない。" },
    { t:"カスタム coherence 評価器を用いた prompt flow 評価", c:false, e:"本来Coherence評価は応答品質を測定するものであり、敵対的耐性を測るものではない。" }
  ],
  summary:"リリース前のプロンプトインジェクション/有害コンテンツ耐性の自動テスト＝Simulatorクラスによる敵対的シミュレーション。手動JSONLデータセット/AnalyzeText/coherence評価はいずれも本要件を満たさない。",
  keywords:[
    { k:"prompt flow 組み込み評価器（Groundedness / Fluency / Coherence / Similarity）と Simulator", d:"Simulatorによる敵対的シミュレーションの自動化。" }
  ]
},
{
  id:"q289", domain:"genai", type:"multi", source:"Udemy AI-103",
  q:"あるチームが、本番チャットボットの Azure OpenAI 推論コストを削減したいと考えています。分析の結果、ワークロードには意味的に冗長なクエリが40%、シンプルな質問と複雑な質問の混在があることが判明しました。適切なクエリタイプにおいて品質を低下させずに、LLM の呼び出し回数または呼び出しあたりコストを直接削減できる最適化手法を2つ選んでください。",
  choices:[
    { t:"Azure API Management を介したセマンティックキャッシュにより、ほぼ同一のクエリをキャッシュ済み応答へルーティングする", c:true, e:"正解。セマンティックキャッシュは、意味的に類似したクエリに対しキャッシュ済み応答を返すことで冗長なLLM呼び出しを排除し、40%の冗長性に直接対処する。" },
    { t:"モデルルーティングにより、シンプルな分類クエリを GPT-4o mini へ、複雑な推論を GPT-4o へ振り分ける", c:true, e:"正解。モデルルーティングは、シンプルなクエリをGPT-4o mini(トークンあたり低コスト)に振り分け、GPT-4oは複雑なクエリ用に温存することで、呼び出しあたりコストを下げる。" },
    { t:"max_tokens パラメータを増やして、1 回の呼び出しでより長く包括的な応答を生成させる", c:false, e:"本来max_tokensを増やすと出力トークンが増えて呼び出しあたりのコストはむしろ上昇し、呼び出し回数もコストも削減しない。" },
    { t:"利用率に関係なく、すべてのデプロイを PTU に切り替える", c:false, e:"本来すべてをPTUに切り替えるのはコスト効率が出るのは概ね60-70%以上の利用率の場合だけで、無条件に適用すれば低利用率時にコストが上がる。" },
    { t:"フィルタ処理によるレイテンシ負荷を取り除くため、コンテンツフィルターを無効化する", c:false, e:"本来コンテンツフィルターの無効化はセキュリティリスクであり、LLM推論コストを意味のある形で削減するものでもない。" }
  ],
  summary:"品質を落とさずLLM呼び出し回数/コストを削減＝セマンティックキャッシュ(冗長クエリ排除)＋モデルルーティング(難易度別振り分け)。max_tokens増加/無条件PTU切替/コンテンツフィルター無効化はいずれも不適切。",
  keywords:[
    { k:"セマンティック キャッシングと PTU スピルオーバー（コスト最適化）", d:"セマンティックキャッシュとモデルルーティング。" }
  ]
},
{
  id:"q290", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるチームが、GPT-4o ワークロードの従量課金 (pay-per-token) と PTU (Provisioned Throughput Unit) デプロイのどちらを選ぶか検討しています。トラフィック分析によれば、ビジネスタイム全体を通じた予測 PTU 容量に対する平均利用率が55%で、ピーク時には85%に達します。ドキュメントに記載された損益分岐点に基づいて、チームが導くべき結論はどれですか？",
  choices:[
    { t:"PTU はコスト効率が良い。55% の平均利用率はおよそ50%の損益分岐点を超えている", c:false, e:"本来PTUは無条件に安いわけではなく、損益分岐点はおよそ50%ではない。" },
    { t:"PTU はコスト効率が悪い。55% の平均利用率は約60-70%の損益分岐点を下回っており、従量課金の方が安い", c:true, e:"正解。Foundryのドキュメントは、PTUと従量課金の損益分岐点はモデルやリージョンに応じておよそ60-70%の利用率であると述べている。平均利用率55%では、PTUの時間単価をフルで支払いながら容量の55%しか使っていないため、平均的には従量課金の方が安価になる。" },
    { t:"PTU は利用率に関係なく常に従量課金より安い", c:false, e:"本来PTUは無条件に安いわけではない。" },
    { t:"85% のピーク利用率はスロットリングを避けるために PTU が必要であることを意味し、コストに関係なく PTU が必須となる", c:false, e:"本来85%のピークは従量課金へのスピルオーバーを構成することで対応できるため、スロットリング懸念がコスト分析を上書きする理由にはならない。" }
  ],
  summary:"平均利用率55%(損益分岐点60-70%を下回る)＝従量課金の方がコスト効率が良い。50%超過/無条件に安い/ピーク85%でPTU必須はいずれも誤った結論。",
  keywords:[
    { k:"セマンティック キャッシングと PTU スピルオーバー（コスト最適化）", d:"PTU vs 従量課金の損益分岐点(60-70%)。" }
  ]
},
{
  id:"q291", domain:"genai", type:"multi", source:"Udemy AI-103",
  q:"あるチームが、モデル品質が低下した際にプルリクエストをブロックできるよう、prompt flow の評価を CI/CD パイプラインに組み込みたいと考えています。Foundry がパイプラインで評価をプログラマティックに実行するためにサポートしているツール/インターフェースを2つ選んでください。",
  choices:[
    { t:"azure.ai.evaluation Python SDK", c:true, e:"正解。azure.ai.evaluation Python SDKのevaluate()はパイプライン内で評価をプログラマティックに実行して結果メトリックを返し、パイプラインがそのメトリックをしきい値と比較するCI/CDゲートに組み込める。" },
    { t:"prompt flow CLI (pfazure) による評価実行のクラウドサブミッション", c:true, e:"正解。prompt flow CLI(pfazure)はローカルフローの評価実行をクラウドへサブミットでき、パイプラインが結果メトリックを取得してしきい値比較のゲートステップを実装できる。" },
    { t:"Azure DevOps Boards のタスク割り当て API", c:false, e:"本来Azure DevOps Boardsはプロジェクト管理ツールであり、評価インターフェースではない。" },
    { t:"prompt flow コネクタを備えた Azure Logic Apps", c:false, e:"本来Logic Appsはワークフローをトリガーできるが、サポートされた評価インターフェースではない。" },
    { t:"Azure OpenAI ファインチューニング API の直接呼び出し", c:false, e:"本来ファインチューニングAPI呼び出しはモデルを学習するものであり、評価実行を行うものではない。" }
  ],
  summary:"CI/CDパイプラインでの評価プログラマティック実行＝azure.ai.evaluation Python SDK(evaluate())＋prompt flow CLI(pfazure)。DevOps Boards/Logic Apps/ファインチューニングAPIはいずれも評価インターフェースではない。",
  keywords:[
    { k:"prompt flow のテスト手法（Playground 単一行 vs バッチラン vs 評価フロー vs デプロイのトラフィック ロギング）", d:"CI/CDパイプラインへの評価組み込み。" }
  ]
},
{
  id:"q292", domain:"agent", type:"single", source:"Udemy AI-103",
  q:"Foundry エージェントが外部の在庫管理システムを呼び出すよう構成されています。開発者は在庫照会を JSON スキーマ付きの関数ツールとして定義しています。エージェントが実行中にこの関数を呼び出すと判断すると、実行は 'requires_action' に遷移します。アプリケーションは実行を取得し、在庫 API 呼び出しを実行し、結果を送り返す必要があります。実行を再開するために関数結果を送信する SDK 操作はどれですか？",
  choices:[
    { t:"初期ペイロードに関数出力を含めた agents_client.create_run()", c:false, e:"本来create_runは新しい実行を開始するもので、既存の実行にツール出力を注入することはできない。" },
    { t:"実行 ID とツール出力リストを伴う agents_client.submit_tool_outputs_to_run()", c:true, e:"正解。submit_tool_outputs_to_runは実行IDとツール出力(tool_call_idと出力文字列)のリストを提供し、関数結果をスレッドコンテキストに注入して実行を再開させ、モデルが最終応答を生成できるようにする。" },
    { t:"関数結果をアシスタントメッセージとした agents_client.add_message()", c:false, e:"本来add_messageはスレッドにユーザーメッセージを追加するものであり、進行中の実行にツール出力を追加するものではない。" },
    { t:"status = 'in_progress' とツール出力を含む agents_client.update_run()", c:false, e:"本来update_runはツール出力を送信するための有効なAgent Service操作ではない。" }
  ],
  summary:"requires_action状態からの実行再開＝agents_client.submit_tool_outputs_to_run(実行ID+ツール出力リスト)。create_run/add_message/update_runはいずれもツール出力を注入する手段ではない。",
  keywords:[
    { k:"Foundry エージェント run のライフサイクル状態（queued/in_progress/requires_action/completed/failed）", d:"submit_tool_outputs_to_run()による実行再開。" }
  ]
},
{
  id:"q293", domain:"agent", type:"multi", source:"Udemy AI-103",
  q:"Microsoft Agent Framework において、構成要素とその説明の対応として正しい記述をすべて選びなさい。",
  choices:[
    { t:"KernelFunction デコレーター → プラグインのメソッドを JSON ツールスキーマに変換して LLM に登録する", c:true, e:"正解。KernelFunctionデコレーター: プラグインのメソッドをJSONツールスキーマに変換してLLMに登録する。" },
    { t:"SelectorGroupChat → 会話履歴に基づき LLM が次に発話するエージェントを動的に選択するグループチャットモード", c:true, e:"正解。SelectorGroupChat: 会話履歴に基づきLLMが次に発話するエージェントを動的に選択するグループチャットモード。" },
    { t:"CodeExecutorAgent → トークン上限・収束フレーズ・最大ターン数などでマルチエージェント会話を終了させる構成", c:false, e:"本来この説明はCodeExecutorAgentではなくAgentChatの終了条件に対応する。CodeExecutorAgentの正しい説明はPythonコードをサブプロセスで実行するエージェントタイプ。" },
    { t:"AgentChat の終了条件 → Python コードをサブプロセスで実行するエージェントタイプ", c:false, e:"本来この説明はAgentChatの終了条件ではなくCodeExecutorAgentに対応する。AgentChatの終了条件の正しい説明はトークン上限・収束フレーズ・最大ターン数などでマルチエージェント会話を終了させる構成。" },
    { t:"CodeExecutorAgent → Python コードをサブプロセスで実行するエージェントタイプ", c:true, e:"正解。CodeExecutorAgent: Pythonコードをサブプロセスで実行するエージェントタイプ。" },
    { t:"KernelFunction デコレーター → 会話履歴に基づき LLM が次に発話するエージェントを動的に選択するグループチャットモード", c:false, e:"本来この説明はKernelFunctionデコレーターではなくSelectorGroupChatに対応する。KernelFunctionデコレーターの正しい説明はプラグインのメソッドをJSONツールスキーマに変換してLLMに登録すること。" }
  ],
  summary:"Agent Frameworkの構成要素対応＝KernelFunction(ツールスキーマ変換)/SelectorGroupChat(動的発話者選択)/AgentChat終了条件(会話終了構成)/CodeExecutorAgent(Python実行)。役割の取り違えに注意。",
  keywords:[
    { k:"マルチエージェント オーケストレーションのグループチャット パターン（RoundRobin / Selector / Process Framework）と Semantic Kernel の @kernel_function", d:"Agent Framework各構成要素の役割対応。" }
  ]
},
{
  id:"q294", domain:"vision", type:"multi", source:"Udemy AI-103",
  q:"Azure AI Video Indexer において、インサイトタイプと動画から抽出される内容の対応として正しい記述をすべて選びなさい。",
  choices:[
    { t:"話者ダイアライゼーション → 音声トラックに登場する異なる話者を識別し、タイムスタンプを付与する", c:true, e:"正解。話者ダイアライゼーション: 音声トラックに登場する異なる話者を識別し、タイムスタンプを付与する。" },
    { t:"OCR → 動画フレーム上に表示されるテキストを検出する", c:true, e:"正解。OCR: 動画フレーム上に表示されるテキストを検出する。" },
    { t:"ブランド言及 → シーンの変化に基づいて動画を意味のある視覚セグメントに分割する", c:false, e:"本来この説明はブランド言及ではなくショットおよびシーン分割に対応する。ブランド言及の正しい説明は動画内で話されたり表示されたりする企業名・製品名・ブランド名を認識すること。" },
    { t:"ショットおよびシーン分割 → 動画内で話されたり表示されたりする企業名・製品名・ブランド名を認識する", c:false, e:"本来この説明はショットおよびシーン分割ではなくブランド言及に対応する。ショットおよびシーン分割の正しい説明はシーンの変化に基づいて動画を意味のある視覚セグメントに分割すること。" },
    { t:"ショットおよびシーン分割 → シーンの変化に基づいて動画を意味のある視覚セグメントに分割する", c:true, e:"正解。ショットおよびシーン分割: シーンの変化に基づいて動画を意味のある視覚セグメントに分割する。" },
    { t:"OCR → 音声トラックに登場する異なる話者を識別し、タイムスタンプを付与する", c:false, e:"本来この説明はOCRではなく話者ダイアライゼーションに対応する。OCRの正しい説明は動画フレーム上に表示されるテキストを検出すること。" }
  ],
  summary:"Video Indexerのインサイトタイプ対応＝話者ダイアライゼーション(話者識別)/OCR(表示テキスト検出)/ショット・シーン分割(視覚セグメント分割)/ブランド言及(企業・製品名認識)。役割の取り違えに注意。",
  keywords:[
    { k:"Video Indexer と 空間分析（Spatial Analysis）", d:"インサイトタイプの対応関係。" }
  ]
},
{
  id:"q295", domain:"knowledge", type:"single", source:"Udemy AI-103",
  q:"ある Azure AI Search インデックスが、Azure OpenAI 埋め込みデプロイを用いた統合ベクトル化 (integrated vectorization) を使用しています。開発者がベクトル配列を提供せずに、標準の検索 REST API を使ってテキスト検索クエリを送信しました。統合ベクトル化はクエリ実行にどう影響しますか？",
  choices:[
    { t:"ベクトル配列が提供されていないため、クエリは vectorizer を無視して純粋な BM25 キーワード検索にフォールバックし、埋め込みによる意味的一致は一切行われずに字句一致だけでスコアリングされる", c:false, e:"本来クエリはBM25のみにフォールバックすることはなく、まずvectorizerが処理する。" },
    { t:"ベクトル検索が実行される前に、インデックスの vectorizer 構成を使ってテキストクエリが自動的に埋め込みベクトル化され、別途の埋め込み API 呼び出しが不要になる", c:true, e:"正解。ベクトル検索が実行される前に、vectorizer構成(Azure OpenAI埋め込みデプロイを指す)を使ってテキストクエリが自動的に埋め込みベクトル化されるため、検索前にアプリケーションが別途埋め込みAPI呼び出しを行う必要はなくなる。" },
    { t:"クエリは 400 Bad Request エラーで拒否され、統合ベクトル化が構成されていても呼び出し側に事前計算済みの埋め込みベクトル配列を vectorQueries で明示提供することを必須として要求する", c:false, e:"本来統合ベクトル化が構成されている場合、APIはテキストクエリを拒否せず、vectorizerが自動的に処理する。" },
    { t:"vectorizer は非同期に動作し、最初の応答ではジョブ ID のみを返してから別の API 呼び出しで埋め込みを返却するため、クライアントは完了するまで状態をポーリングする必要がある", c:false, e:"本来埋め込みは同期的で非同期ではなく、クエリは単一リクエストで結果を返す。" }
  ],
  summary:"統合ベクトル化はクエリ時にvectorizer構成でテキストクエリを自動的に埋め込みベクトル化し、別途の埋め込みAPI呼び出しを不要にする。BM25フォールバック/400エラー/非同期ポーリングはいずれも誤り。",
  keywords:[
    { k:"ベクター検索 と 統合ベクトル化、フィールド属性", d:"クエリ時の自動埋め込みの仕組み。" }
  ]
}

]);
