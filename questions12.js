/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ12 (q256-q275)
 *  出典: Udemy掲載のAI-103対策講座（ユーザー提供の20問を再構成、第4弾）。
 *  source:"Udemy AI-103" を付与。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q256", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるソリューションアーキテクトが、Azure 上で新しい AI アプリケーションを設計しています。このアプリケーションは、チャットに GPT-4o、埋め込みに text-embedding-3-large、検索に Azure AI Search を使用する必要があり、それらすべてを同一の Azure リージョン内で、単一のコストセンターによって統括する必要があります。アーキテクトが最初に作成すべき最上位の Azure 構成要素はどれですか？",
  choices:[
    { t:"Azure Machine Learning ワークスペース", c:false, e:"本来Azure MLワークスペースはFoundry以前から存在する仕組みであり、Foundryネイティブのモデルカタログやエージェント機能は提供しない。" },
    { t:"Microsoft Foundry ハブ", c:true, e:"正解。Microsoft Foundryハブは、共有ストレージ、Key Vault、接続情報のもとで複数のAIサービスをまとめる最上位のガバナンス構成要素。ハブは複数のプロジェクトを格納し、チームはそこにGPT-4o、埋め込みモデル、AI Search接続を統制された環境でデプロイできる。" },
    { t:"スタンドアロンの Azure OpenAI リソース", c:false, e:"本来スタンドアロンのAzure OpenAIリソースにはプロジェクト分離や共有接続管理の仕組みがない。" },
    { t:"マルチサービス型の Azure AI services リソース", c:false, e:"本来マルチサービス型リソースは1つのキーを共有するが、Foundryのプロジェクト構造やハブ単位のコストタグ付けは提供しない。" }
  ],
  summary:"複数AIサービスを単一リージョン+単一コストセンターで統括する最上位構成要素＝Microsoft Foundryハブ。ML workspace/スタンドアロンOpenAI/マルチサービスリソースはいずれもガバナンス機能が不足。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"ハブ＝最上位のガバナンス構成要素。" }
  ]
},
{
  id:"q257", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるデータサイエンティストが、カスタム scikit-learn モデルを Microsoft Foundry のリアルタイム REST エンドポイントとしてデプロイしたいと考えています。モデルは MLflow アーティファクトとしてパッケージ化されています。チームは、1 分あたりのリクエスト数や CPU 使用率に基づく自動スケーリングで、トラフィックの増減に応じてインスタンス数を調整することを必要としています。チームが選択すべき Foundry のデプロイ種別はどれですか？",
  choices:[
    { t:"コンピュートクラスターを利用したバッチエンドポイント", c:false, e:"本来バッチエンドポイントは非同期の一括推論用であり、リアルタイムREST用ではない。" },
    { t:"モデルカタログからのサーバーレス API デプロイ", c:false, e:"本来サーバーレスAPIデプロイはFoundryモデルカタログのモデル(トークン課金)に限定されており、任意のMLflowアーティファクトには対応しない。" },
    { t:"自動スケールルールを設定したマネージドオンラインエンドポイント", c:true, e:"正解。マネージドオンラインエンドポイントは完全マネージドのコンテナーでモデルをホストし、1分あたりのリクエスト数(RequestsPerMinute)やCPU使用率(CpuUtilizationPercentage)などのメトリックに基づく独立した自動スケールルールをサポートするため、カスタムMLflowモデルのリアルタイムREST推論に最適。" },
    { t:"AKS Arc 経由の Azure Container Apps デプロイ", c:false, e:"本来この種別はFoundryには存在しない。Kubernetes上へのモデルデプロイはAKS/Arc対応クラスターをアタッチしたKubernetesオンラインエンドポイントで行うものであり、Azure Container Appsはその経路ではない。" }
  ],
  summary:"MLflowモデルのリアルタイムREST+自動スケーリング＝自動スケールルール付きマネージドオンラインエンドポイント。バッチ/サーバーレスAPI/存在しないAKS Arc経由Container Appsはいずれも不適切。",
  keywords:[
    { k:"大規模バッチ処理向けエンドポイント種別（バッチ エンドポイント vs マネージド オンライン エンドポイント vs サーバーレスAPI）", d:"自動スケールルールとKubernetesオンラインエンドポイント。" }
  ]
},
{
  id:"q258", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるセキュリティエンジニアが、新しいチームメンバーに対して Foundry プロジェクト内のモデルデプロイの作成と削除の権限を付与したいと考えていますが、シークレットの接続文字列の参照や新規接続の作成はさせないようにする必要があります。割り当てるべき Foundry の組み込みロールはどれですか？",
  choices:[
    { t:"Azure AI Developer。プロジェクト内の接続文字列の参照と新規接続の作成を含む広範な開発操作を許可する", c:false, e:"本来Azure AI Developerは評価の実行や接続情報の参照などより広範な権限を含み、ここでの最小権限の原則に反する。" },
    { t:"プロジェクトスコープの Owner。デプロイ管理に加えてロール割り当てと接続シークレットの読み取りまで完全に許可する", c:false, e:"本来Ownerはシークレットへのアクセスを含むフル権限を付与する。" },
    { t:"Azure AI Inference Deployment Operator", c:true, e:"正解。Azure AI Inference Deployment Operatorロールは、モデルデプロイの作成と削除に特化したスコープを持つ。接続情報の参照、シークレットの管理、新規サービス接続の作成は許可しない。" },
    { t:"ハブスコープの Contributor。ハブ配下の全プロジェクトに対する接続作成とシークレット参照を一括して許可する", c:false, e:"本来ハブスコープのContributorは過剰な権限がすべてのプロジェクトおよびハブレベルリソースに伝播してしまう。" }
  ],
  summary:"デプロイの作成/削除のみ許可しシークレットへのアクセスは不可＝Azure AI Inference Deployment Operator。Azure AI Developer/Owner/ハブスコープContributorはいずれも過剰な権限。",
  keywords:[
    { k:"Foundry のロールベース アクセス制御（Azure AI Developer / Inference Deployment Operator / ハブレベル vs プロジェクトレベル）", d:"Inference Deployment Operatorの限定スコープ。" }
  ]
},
{
  id:"q259", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"PTU (プロビジョニング済みスループットユニット) で稼働する GPT-4o デプロイを管理する DevOps チームが、デプロイが飽和状態に達し、トークン課金 (pay-per-token) へのスピルオーバーが発生する直前であることを検知したいと考えています。Azure Monitor のどのメトリクスにアラートのしきい値を設定すべきですか？",
  choices:[
    { t:"リクエストレイテンシ (P99)", c:false, e:"本来P99レイテンシは結果として現れる症状であり、容量を示す指標ではない。" },
    { t:"PTU 利用率 (パーセンテージ)", c:true, e:"正解。PTU利用率は、予約済みスループット容量がどれだけ消費されているかを直接測定するメトリクス。利用率が継続的に90%を超え、スピルオーバーが構成されている場合、トークン課金デプロイへのスピルオーバーが発生するため、85〜90%でアラートを設定すれば事前警告が得られる。" },
    { t:"ThrottledRequests のカウント", c:false, e:"本来ThrottledRequestsはスピルオーバーが構成されていない場合にしか発生しない。" },
    { t:"消費プロンプトトークン数", c:false, e:"本来プロンプトトークン数は使用量を示すが、予約済み容量に対する利用率は示さない。" }
  ],
  summary:"PTUスピルオーバーの事前警告＝PTU利用率(パーセンテージ)。P99レイテンシ/ThrottledRequests/消費トークン数はいずれも容量逼迫の先読み指標ではない。",
  keywords:[
    { k:"PTU デプロイの監視メトリクスと分散トレーシング環境変数", d:"PTU利用率によるスピルオーバー事前警告。" }
  ]
},
{
  id:"q260", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある開発者が Azure AI Content Safety の Prompt Shields API を直接呼び出して、RAG で取得したドキュメントに埋め込まれた悪意ある指示を検査したいと考えています。1 回の Prompt Shields 呼び出しで、エンドユーザーの入力と取得ドキュメントの両方を検査するために、リクエスト本文で指定すべきフィールドの組み合わせはどれですか？",
  choices:[
    { t:"userPrompt フィールドにエンドユーザーの入力を、documents 配列に取得したドキュメントのテキストを渡す", c:true, e:"正解。userPromptにエンドユーザーの入力を、documents配列に取得ドキュメントを渡すことで、1回のPrompt Shields呼び出しで直接・間接の両インジェクションを検査できる。" },
    { t:"text フィールドに、ユーザー入力と取得ドキュメントを結合した1つの文字列として渡す", c:false, e:"本来ユーザー入力と取得ドキュメントを1つの文字列に結合して渡すと、どちらの入力で攻撃が検出されたかを区別できず、Prompt Shieldsが想定する入力形式にも合わない。" },
    { t:"prompt フィールドにユーザー入力のみを渡し、ドキュメントは別の Groundedness 検出 API で検査する", c:false, e:"本来ユーザー入力のみを渡すと取得ドキュメントに埋め込まれた間接インジェクションを検査できない。Groundedness検出は攻撃検出ではなく応答の裏付けを測る別機能。" },
    { t:"messages 配列にチャット履歴を渡し、documents はコンテキストから自動的に推論させる", c:false, e:"本来Prompt Shieldsはチャット履歴からドキュメントを自動推論しない。検査対象の外部コンテンツはdocuments配列で明示的に渡す必要がある。" }
  ]
,
  summary:"1回の呼び出しで直接+間接インジェクションを検査＝userPromptフィールド+documents配列。文字列結合/ユーザー入力のみ/自動推論はいずれも不適切。",
  keywords:[
    { k:"Content Safety の危害カテゴリ と 別機能（Prompt Shields / グラウンド検出 / 保護素材検出）", d:"userPrompt/documentsフィールドの使い分け。" }
  ]
},
{
  id:"q261", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるチームが、推薦モデルの2つのバージョンを同一の Foundry マネージドオンラインエンドポイントの背後にデプロイしました。新バージョンに本番トラフィックの10%、安定版に90%を割り振り、2週間メトリクスを検証した後に新バージョンを100%に昇格させたいと考えています。このパターンを実現する Foundry の機能はどれですか？",
  choices:[
    { t:"バッチエンドポイントのジョブスケジューリング", c:false, e:"本来バッチエンドポイントはファイルを非同期で処理するものであり、ライブトラフィック分割はサポートしない。" },
    { t:"エンドポイントデプロイ間でのトラフィック割り振り (パーセンテージ)", c:true, e:"正解。Foundryのマネージドオンラインエンドポイントは、単一のエンドポイントの下で複数のデプロイをサポートし、それぞれにトラフィック割り振り(パーセンテージ)を構成できる。10%/90%の分割を設定することで、クライアントURLを変更せずにブルー/グリーンデプロイやA/Bテストが可能。" },
    { t:"サーバーレス API デプロイのルーティングルール", c:false, e:"本来モデルカタログのモデル向けサーバーレスAPIデプロイはトラフィック分割の構成を公開していない。" },
    { t:"Azure API Management のレート制限ポリシー", c:false, e:"本来Azure API Managementでもトラフィックをルーティングできるが、Foundryネイティブのエンドポイント機能で要件を満たせるため、不要な複雑性を加えることになる。" }
  ],
  summary:"同一エンドポイント配下2バージョンの段階的トラフィック分割＝デプロイ間のトラフィック割り振り(パーセンテージ)。バッチ/サーバーレスAPI/APIMはいずれも不要または非対応。",
  keywords:[
    { k:"マネージド オンライン エンドポイントのトラフィック割り振り（ブルー/グリーンデプロイ・A/Bテスト）", d:"デプロイ間のトラフィック割り振り。" }
  ]
},
{
  id:"q262", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある金融機関が、マネージド VNet 分離で Microsoft Foundry ハブを作成しました。6 か月後、セキュリティチームは既存の ExpressRoute 回線と統合するため、Foundry マネージド VNet ではなく顧客管理 VNet とプライベートエンドポイントをハブに使用すべきだと判断しました。この変更を達成するために、チームは何をしなければなりませんか？",
  choices:[
    { t:"Azure ポータルの「ハブ設定」でハブのネットワーク分離モードを更新する", c:false, e:"本来ポータルで作成後に分離モードを変更するオプションは提供されていない。" },
    { t:"ハブを削除し、顧客管理プライベートエンドポイント構成で再作成する", c:true, e:"正解。ネットワーク分離モードはハブの作成時に設定され、作成後は変更できないため、顧客管理プライベートエンドポイント構成へ移行するにはハブを削除して再作成する必要がある。" },
    { t:"新しいマネージド VNet サブネットをデプロイし、顧客 VNet とピアリングする", c:false, e:"本来Foundryのドキュメントには、ネットワーク分離モードはハブの作成時に設定され、ハブ作成後は変更できないと明記されている。" },
    { t:"既存ハブに対して `az ml workspace update --isolation-mode customer-managed` を実行する", c:false, e:"本来Foundryのドキュメントには、ネットワーク分離モードはハブの作成時に設定され、ハブ作成後は変更できないと明記されている。" }
  ],
  summary:"ハブのネットワーク分離モードは作成時にのみ設定され変更不可＝顧客管理プライベートエンドポイントへの移行にはハブの削除+再作成が必要。ポータル変更/VNetピアリング/CLIコマンドでの変更はいずれも成立しない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"分離モードは作成時のみ設定可能。" }
  ]
},
{
  id:"q263", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある企業が Foundry ハブで顧客管理キー (CMK) 暗号化を有効化しようとしています。CMK を保持する Azure Key Vault について、暗号化構成が失敗しないために満たしておくべき前提条件はどれですか？",
  choices:[
    { t:"Key Vault で論理的削除 (soft delete) と消去保護 (purge protection) を有効化しておく", c:true, e:"正解。CMKを有効化するには、キーを保持するKey Vaultで論理的削除と消去保護を有効にしておく必要があり、これがキーの誤削除・消去による暗号化データの喪失を防ぐ。" },
    { t:"Key Vault を Foundry ハブと同じマネージド VNet 内のプライベートエンドポイント専用に構成する", c:false, e:"本来Key Vaultをマネージド VNet内のプライベートエンドポイント専用に構成することはCMK有効化の前提条件ではない。" },
    { t:"Key Vault のファイアウォールですべてのパブリックアクセスを完全にブロックする", c:false, e:"本来パブリックアクセスの完全遮断はCMK有効化の要件ではなく、かえってハブがキーへ到達できなくなる恐れもある。" },
    { t:"Key Vault に対称 (AES) キーを格納し、ハブのマネージド ID に Key Vault Administrator ロールを付与する", c:false, e:"本来CMKにはRSAキーが必要で対称(AES)キーは使用できず、マネージドIDにはキーの取得(get)・ラップ・アンラップの権限を付与すれば足り、Key Vault Administratorロールは過剰付与。" }
  ],
  summary:"CMK有効化の前提条件＝Key Vaultでのsoft delete+purge protection有効化(RSAキー使用、マネージドIDには最小限のget/ラップ/アンラップ権限)。プライベートエンドポイント専用構成/パブリックアクセス完全遮断/AESキー+Administratorロールはいずれも誤り。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"CMK有効化のsoft delete/purge protection前提条件。" }
  ]
},
{
  id:"q264", domain:"plan", type:"multi", source:"Udemy AI-103",
  q:"あるプラットフォームチームが、規制対象ワークロード向けに Foundry ハブをハードニングしています。Foundry リソースに関する Microsoft の主要なセキュリティ推奨事項に合致する行動を、次の中から3つ選んでください。",
  choices:[
    { t:"ハブにアクセスするすべてのアプリケーションコードでマネージド ID 認証を使用し、API キーの使用を回避する", c:true, e:"正解。マネージドID認証を使用すると資格情報をコードや構成ファイルに埋め込む必要がなくなり、APIキーの漏えいリスクを排除できる。" },
    { t:"開発者の利便性のため、ハブの API キーをアプリケーション構成ファイルに保存する", c:false, e:"本来これはAPIキーを構成ファイルに埋め込むものであり、マネージドIDの推奨に反する。" },
    { t:"ハブを含むサブスクリプションで Microsoft Defender for Cloud を有効化する", c:true, e:"正解。サブスクリプションでMicrosoft Defender for Cloudを有効化し脅威検出を行う。" },
    { t:"すべての新規 Foundry リソースに対してプライベートエンドポイントの利用を強制する Azure Policy を適用する", c:true, e:"正解。新規Foundryリソースにプライベートエンドポイントを強制するAzure Policyを適用してネットワーク分離を確保する。" },
    { t:"最大限の柔軟性のために、ハブのマネージド ID に Key Vault Administrator ロールを割り当てる", c:false, e:"本来これはKey Vaultのアクセス権限を過剰に付与している。" }
  ],
  summary:"Foundryハブのセキュリティ推奨事項＝①マネージドID認証(APIキー回避) ②Defender for Cloud有効化 ③新規リソースへプライベートエンドポイント強制のAzure Policy。APIキー構成ファイル保存/Key Vault Administrator付与はいずれも避けるべき。",
  keywords:[
    { k:"Foundry ハブのセキュリティ ハードニング推奨事項（マネージドID/Defender for Cloud/Azure Policy）", d:"3つの主要推奨事項。" }
  ]
},
{
  id:"q265", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるチームが RAG チャットボットの本番向けコンテンツ安全性パイプラインを実装しています。次の4つの段階の、最初から最後までの正しい運用順はどれですか。",
  choices:[
    { t:"ユーザークエリを受信しユーザーメッセージに直接プロンプトインジェクションシールドを適用 → 取得チャンクをプロンプトに注入する前に間接プロンプトインジェクションシールドを適用 → グラウンディング済み応答をグラウンディング検出に通す → 最終応答を返す前にコンテンツカテゴリフィルター (ヘイト/暴力/性的/自傷) を適用", c:true, e:"正解。受信メッセージをまず直接インジェクションについて検査し、取得チャンクは注入前に間接インジェクションを検査、生成応答のグラウンディングを検証し、最後に出力応答へカテゴリフィルターを適用する。" },
    { t:"先にユーザーメッセージへヘイト・暴力・性的・自傷のコンテンツカテゴリフィルターを適用 → 続いて同じユーザーメッセージへ直接プロンプトインジェクションシールドを適用 → 取得チャンクには間接プロンプトインジェクションシールドを後段で適用 → 最後にグラウンディング済み応答へグラウンディング検出を実行して返す", c:false, e:"本来コンテンツカテゴリフィルターは入力ではなく出力応答に適用し、最後に実行するものであり、この順序は誤り。" },
    { t:"まず取得チャンクへ間接プロンプトインジェクションシールドを先行適用 → その後ユーザーメッセージへ直接プロンプトインジェクションシールドを適用 → ヘイト・暴力・性的・自傷のコンテンツカテゴリフィルターを入出力へまとめて適用 → 最後にグラウンディング済み応答へグラウンディング検出を実行して返す", c:false, e:"本来ユーザーメッセージの直接インジェクション検査は、取得チャンクの処理より前に行う必要がある。" },
    { t:"先にユーザーメッセージへ直接プロンプトインジェクションシールドを適用 → 取得を行う前の生成済み応答へ先にグラウンディング検出を実行 → 続いて取得チャンクへ間接プロンプトインジェクションシールドを適用 → 最後にヘイト・暴力・性的・自傷のコンテンツカテゴリフィルターを適用して返す", c:false, e:"本来間接インジェクションの遮蔽は、グラウンディング検出が検査する応答をLLMが生成する前に取得チャンクへ行う必要がある。" }
  ],
  summary:"RAGコンテンツ安全性パイプラインの正しい順序＝直接シールド(ユーザーメッセージ)→間接シールド(取得チャンク)→グラウンディング検出(生成応答)→出力カテゴリフィルター(最終応答)。順序を入れ替えた選択肢はいずれも誤り。",
  keywords:[
    { k:"Content Safety の危害カテゴリ と 別機能（Prompt Shields / グラウンド検出 / 保護素材検出）", d:"RAGパイプラインの正しい適用順序。" }
  ]
},
{
  id:"q266", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるチームが、デプロイ済みの Foundry アプリケーションについて、個々のプロンプトフローノード (LLM 呼び出し、Python の後処理、検索ステップ) のエンドツーエンドのレイテンシを追跡したいと考えています。有効化すべき監視統合はどれですか？",
  choices:[
    { t:"リソースタグ付きの Azure Cost Management + Billing", c:false, e:"本来Cost Managementは支出を追跡するものでありレイテンシは追跡しない。" },
    { t:"OpenTelemetry スパンを介した Application Insights の分散トレース", c:true, e:"正解。azure.ai.inferenceトレースモジュールはAPPLICATIONINSIGHTS_CONNECTION_STRINGが設定されているときOpenTelemetry互換のスパンを送出し、ノードレベルでのレイテンシ可視化を提供する。" },
    { t:"TotalCalls に対する Azure Monitor のメトリクスアラート", c:false, e:"本来TotalCallsは集約カウントメトリクスであり、ノード単位のレイテンシ内訳は示さない。" },
    { t:"AzureMLModelsEvent に対する Log Analytics のカスタム KQL クエリ", c:false, e:"本来AzureMLModelsEventは推論リクエストをログに記録するが、ノードレベルのスパン分解は提供しない。" }
  ],
  summary:"個々のprompt flowノードのエンドツーエンドレイテンシ追跡＝OpenTelemetryスパンによるApplication Insightsの分散トレース。Cost Management/TotalCallsアラート/AzureMLModelsEventはいずれもノード単位の粒度を提供しない。",
  keywords:[
    { k:"PTU デプロイの監視メトリクスと分散トレーシング環境変数", d:"OpenTelemetryスパンによるノード単位のトレース。" }
  ]
},
{
  id:"q267", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある企業が Azure 上で顧客文書を処理する必要がありますが、データは常に EU 域内に留まらなければなりません。チームは Azure OpenAI のデプロイ種別を評価しています。地理的ゾーン内にデータ処理を制約しつつ、そのゾーン内の複数 Azure リージョン間で負荷分散を行えるデプロイオプションはどれですか？",
  choices:[
    { t:"西ヨーロッパに固定したリージョナル標準デプロイ", c:false, e:"本来リージョナル標準デプロイは計算リソースを単一リージョンに固定するため、ゾーン内の複数リージョン間での負荷分散は行えない。" },
    { t:"グローバル標準デプロイ", c:false, e:"本来グローバル標準デプロイは世界中で最もレイテンシの低いAzureリージョンにルーティングするため、データがEUを離れる可能性がある。" },
    { t:"EU ゾーン向けのデータゾーンデプロイ", c:true, e:"正解。データゾーンデプロイは、データ主権のために地理的ゾーン(例:EU)内に処理を制約しつつ、ゾーン内のリージョン間で負荷分散を行うため、コンプライアンスと回復性の両方を満たせる。" },
    { t:"単一リージョンの PTU デプロイ", c:false, e:"本来単一リージョンのPTUデプロイは容量を提供するが、ゾーンレベルの負荷分散は提供しない。" }
  ],
  summary:"EU域内制約+ゾーン内複数リージョン負荷分散＝データゾーンデプロイ。リージョナル標準(単一リージョン固定)/グローバル標準(所在地非保証)/単一リージョンPTU(負荷分散なし)はいずれも要件を満たさない。",
  keywords:[
    { k:"Foundry の9つのデプロイの種類（Global / Data Zone / Standard × Standard/Provisioned/Batch、Developer）", d:"Data Zoneデプロイの地理的制約と負荷分散。" }
  ]
},
{
  id:"q268", domain:"plan", type:"multi", source:"Udemy AI-103",
  q:"Microsoft Foundry ハブをプロビジョニングする際、ハブにアタッチされる共有インフラとして「常に」作成されるリソースを2つ選んでください。",
  choices:[
    { t:"アーティファクト保存用の Azure Storage アカウント", c:true, e:"正解。Foundryハブは常にAzure Storageアカウント(トレーニングデータ、モデルアーティファクト、実験出力用)とAzure Key Vault(接続資格情報とシークレット用)をプロビジョニングする。" },
    { t:"Azure Kubernetes Service クラスター", c:false, e:"本来AKSクラスターは個別にアタッチされるオプションのコンピュートターゲットであり、ハブ作成時に常に自動プロビジョニングされるわけではない。" },
    { t:"シークレット管理用の Azure Key Vault", c:true, e:"正解。Foundryハブは常にAzure Storageアカウント(トレーニングデータ、モデルアーティファクト、実験出力用)とAzure Key Vault(接続資格情報とシークレット用)をプロビジョニングする。" },
    { t:"Azure Container Registry", c:false, e:"本来Azure Container Registryはオプションであり、ハブはカスタムコンテナーイメージ用に利用できるが必須ではない。" },
    { t:"Azure AI Search のインデックス", c:false, e:"本来Azure AI Searchはハブに接続できるサービスだが、ハブ作成の一部として自動的にプロビジョニングされるわけではない。" }
  ],
  summary:"Foundryハブ作成時に常にプロビジョニングされる共有インフラ＝Azure Storageアカウント＋Azure Key Vault。AKS/Container Registry/AI Searchはいずれもオプションでハブ作成時に自動作成されない。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"常に作成される共有インフラ。" }
  ]
},
{
  id:"q269", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるチームが、リアルタイムスコアリングモデルを Foundry マネージドオンラインエンドポイントの新しいデプロイとして更新しました。更新直後、新しくプロビジョニングされたインスタンスへの最初の数リクエストで、応答までに30秒の遅延が観測されました。モデル自体は500ミリ秒未満で実行されます。最も可能性が高い原因は何ですか？",
  choices:[
    { t:"自動スケールルールが十分速くスケールアップするように構成されていない", c:false, e:"本来自動スケールルールはインスタンス数の増減を制御するもので、初回リクエスト時の初期化遅延は解消しない。" },
    { t:"エンドポイントが Azure OpenAI のクォータによりレート制限を受けている", c:false, e:"本来レート制限は429エラーを発生させるもので、成功応答が30秒遅延する症状としては現れない。" },
    { t:"スコアリングコードがモデルのロードなどの重い初期化を最初のリクエスト処理時まで遅延させており、その初期化コストがコールドスタートとして最初の応答に現れている", c:true, e:"正解。モデルのロードなどの重い初期化がinit()ではなく最初のリクエスト処理時まで遅延されると、その初期化コスト(数十秒)がウォームアップ前の最初の応答に現れる。" },
    { t:"カスタム Docker イメージがエンドポイントとは異なるリージョンに保存されている", c:false, e:"本来イメージが別リージョンにある場合はインスタンス作成時のイメージプルが遅くなり、デプロイやスケールアウトの所要時間には影響するが、稼働後の個々のリクエスト応答が遅くなる原因ではない。" }
  ],
  summary:"最初の数リクエストだけ30秒遅延(モデル自体は500ms未満)＝スコアリングコードの遅延初期化によるコールドスタート。自動スケール/レート制限/別リージョンイメージはいずれも原因ではない。",
  keywords:[
    { k:"マネージド オンライン エンドポイントのコールドスタート（init()での初期化 vs 遅延初期化）", d:"init()での初期化とコールドスタートの関係。" }
  ]
},
{
  id:"q270", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある企業が、カスタム LLM ベースのアプリケーションをデプロイし、本番トラフィックを開始する前に、カスタマーサポートクエリに対するモデル出力が品質基準を満たしているかを評価したいと考えています。チームが特に重視しているのは、応答が取得したナレッジベース記事を用いて顧客の質問に正確に答えているかどうかです。Foundry の評価フレームワークの中で最も関連する評価メトリクスはどれですか？",
  choices:[
    { t:"Fluency — 応答の自然言語としての品質を測定する", c:false, e:"本来Fluencyは自然言語としての品質(文法、自然さ)を測定するものであり、応答の正確性は測らない。" },
    { t:"Coherence — 応答の構造的なまとまりを測定する", c:false, e:"本来Coherenceは構造的なまとまりを測定するものである。" },
    { t:"Relevance — 応答が質問に答えているかを測定する", c:true, e:"正解。Foundryの評価フレームワークにおけるRelevanceは、応答がユーザーの質問に答えているかを測定するメトリクスであり、クエリに正しく対応するというカスタマーサポートのユースケースに直接合致する。" },
    { t:"Similarity — 参照応答との埋め込みコサイン距離を測定する", c:false, e:"本来Similarityは参照応答に対する埋め込み距離を測定するもので、整備された参照応答が必要であり、ナレッジベースから質問に答えられたかではなく、想定される表現への近さを測る。" }
  ],
  summary:"取得したナレッジベース記事で質問に正確に答えているか＝Relevance。Fluency(自然さ)/Coherence(構造)/Similarity(参照応答との近さ)はいずれも別の品質次元。",
  keywords:[
    { k:"生成品質メトリクス（Groundedness / Groundedness Pro / Relevance / Coherence / Fluency / Similarity）", d:"Relevanceの測定対象。" }
  ]
},
{
  id:"q271", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"ある Foundry ハブがマネージド VNet 分離を使用しています。チームは、`api.partner.example.com` でホストされている外部のサードパーティ REST API をハブから呼び出せるようにしたいと考えています。このアクセスをどのように構成すべきですか？",
  choices:[
    { t:"マネージド VNet のアウトバウンドルールに、FQDN `api.partner.example.com` のカスタムアウトバウンドルールを追加する", c:true, e:"正解。カスタムアウトバウンドルールを使うと、管理者は特定のFQDNやIP範囲を追加でき、ハブのマネージドVNetから外部APIを呼び出せるようになる。" },
    { t:"マネージド VNet 分離を無効化してハブをパブリックネットワークアクセス構成に切り替え、外部 REST API への接続を許可する", c:false, e:"本来マネージドVNetを無効化するとすべての分離効果が失われ、要件に反する。" },
    { t:"マネージド VNet 内にパートナー API を指すプライベートエンドポイントを作成し、Private Link 経由で名前解決して接続する", c:false, e:"本来プライベートエンドポイントの作成はPrivate Linkをサポートする Azureネイティブサービス向けであり、任意の外部パートナー向けではない。" },
    { t:"ハブのネットワークセキュリティグループ上にアウトバウンドのファイアウォール許可ルールを開放して外部 API への通信を許可する", c:false, e:"本来マネージドVNetハブはNSGを直接使用せず、アウトバウンドルールで外部アクセスを制御する。" }
  ],
  summary:"マネージドVNetから外部サードパーティREST APIへのアクセス＝FQDNを指定したカスタムアウトバウンドルール。分離無効化/プライベートエンドポイント/NSG開放はいずれも不適切。",
  keywords:[
    { k:"Microsoft Foundry ハブ（旧 Azure AI Foundry）とプロジェクトの階層、CLIでの作成", d:"マネージドVNetのカスタムアウトバウンドルール。" }
  ]
},
{
  id:"q272", domain:"plan", type:"single", source:"Udemy AI-103",
  q:"あるチームが、デプロイ済みの GPT-4o モデルのグラウンディングスコア (Application Insights のカスタムディメンションとしてログに記録) について、直近60分間の平均が3.0を下回ったときに発火する KQL アラートルールを書きたいと考えています。この KQL クエリを有効にするには、診断設定はどのログ転送先に転送すべきですか？",
  choices:[
    { t:"Azure Blob Storage のアーカイブコンテナー", c:false, e:"本来Blob Storageのアーカイブは長期保存をサポートするがライブKQLクエリはサポートしない。" },
    { t:"ストリーム処理用の Event Hub", c:false, e:"本来Event Hubはストリーム処理を可能にするが、KQLアラートルールはLog Analyticsに対して実行されるものでEvent Hubに対してではない。" },
    { t:"Log Analytics ワークスペース", c:true, e:"正解。KQL(Kusto Query Language)のアラートルールはLog Analyticsワークスペースに対して実行される。診断設定によりFoundryハブの操作ログとカスタムテレメトリがワークスペースに転送され、KQLクエリがカスタムディメンションを集計してアラートを発火できる。" },
    { t:"Azure Data Factory のパイプライントリガー", c:false, e:"本来Azure Data Factoryはデータ統合サービスであり監視アラートとは無関係。" }
  ],
  summary:"カスタムディメンションに対するKQLアラートルール＝Log Analyticsワークスペースへの転送が必須。Blob Storageアーカイブ/Event Hub/Data Factoryはいずれもライブ KQL クエリの実行先ではない。",
  keywords:[
    { k:"診断ログの送信先（Log Analytics / Storage / Event Hub）と メトリック vs ログ", d:"KQLアラートにはLog Analyticsが必須。" }
  ]
},
{
  id:"q273", domain:"plan", type:"multi", source:"Udemy AI-103",
  q:"ある企業が新しいアプリケーション向けに Azure AI サービスを選定しています。次のうち、スタンドアロンのリソースとして個別にプロビジョニングするのではなく、Foundry Tools (Foundry ポータルに事前統合されたツール群) として公開されているサービスを2つ選んでください。",
  choices:[
    { t:"Azure Document Intelligence", c:true, e:"正解。Foundry ToolsのAzure Document IntelligenceとFoundry ToolsのAzure Speechは、いずれもFoundryポータル上で統合ツールとして明示的に公開されている。" },
    { t:"Azure Cognitive Search (クラシック)", c:false, e:"本来Azure Cognitive SearchクラシックはAI Searchの前身であり、Foundry Toolsのサーフェスではない。" },
    { t:"Foundry Tools の Azure Speech", c:true, e:"正解。Foundry ToolsのAzure Document IntelligenceとFoundry ToolsのAzure Speechは、いずれもFoundryポータル上で統合ツールとして明示的に公開されている。" },
    { t:"Power BI Embedded", c:false, e:"本来Power BI EmbeddedとAzure Logic AppsはFoundry Toolsではなく、別個のAzureサービスである。" },
    { t:"Azure Logic Apps", c:false, e:"本来Power BI EmbeddedとAzure Logic AppsはFoundry Toolsではなく、別個のAzureサービスである。" }
  ],
  summary:"Foundryポータルに事前統合されたFoundry Tools＝Azure Document Intelligence＋Azure Speech。Cognitive Search classic/Power BI Embedded/Logic AppsはいずれもFoundry Toolsではない別サービス。",
  keywords:[
    { k:"SDK/API（Foundry SDK / OpenAI API / Foundry Tools SDK）と対応言語", d:"Foundry Toolsの具体例。" }
  ]
},
{
  id:"q274", domain:"genai", type:"single", source:"Udemy AI-103", mono:true,
  q:"ある Python 開発者が、Foundry プロジェクト内から Azure OpenAI の GPT-4o デプロイを呼び出すコードを書いています。デプロイエンドポイントを自動的に解決し、プロジェクトの接続ストアから接続資格情報を取得できる、プロジェクト対応の SDK を使用したいと考えています。開発者が使用すべき Python クラスはどれですか？",
  choices:[
    { t:"openai.AzureOpenAI", c:false, e:"本来openai.AzureOpenAIはエンドポイントとキーのパラメーターを明示する必要があり、プロジェクトの接続ストアからの自動解決には対応しない。" },
    { t:"azure.ai.inference.ChatCompletionsClient", c:false, e:"本来azure.ai.inference.ChatCompletionsClientは任意のAzure AIモデルエンドポイントに接続できるが、プロジェクト対応ではない。" },
    { t:"azure.ai.projects.AIProjectClient と get_openai_client()", c:true, e:"正解。azure.ai.projects.AIProjectClientでFoundryプロジェクトに接続し、get_openai_client()でOpenAI互換クライアントを取得する。" },
    { t:"azure.cognitiveservices.language.textanalytics.TextAnalyticsClient", c:false, e:"本来TextAnalyticsClientはText Analytics(Language)サービス向けのレガシーSDKであり、GPT-4oチャットデプロイの呼び出しにもプロジェクト対応の接続解決にも使用できない。" }
  ],
  summary:"プロジェクトの接続ストアから自動解決してGPT-4oを呼び出す＝azure.ai.projects.AIProjectClient＋get_openai_client()。openai.AzureOpenAI/ChatCompletionsClient/TextAnalyticsClientはいずれもプロジェクト対応ではない。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"get_openai_client()によるプロジェクト対応の接続解決。" }
  ]
},
{
  id:"q275", domain:"genai", type:"single", source:"Udemy AI-103",
  q:"あるプロンプトフロー開発者は、LLM ノード、Python の後処理ノード、出力ノードを含むフローを作成しました。500行のデータセットに対してフローをテストし、すべての入力、出力、中間 LLM 応答を行ごとに確認したいと考えています。この目的に合致するプロンプトフローの機能はどれですか？",
  choices:[
    { t:"Foundry Playground での単一行テスト", c:false, e:"本来Playgroundでの単一行テストは一度に1件の入力を処理するもので、500行のデータセット分析には適さない。" },
    { t:"データセットに対して実行されるバッチラン", c:true, e:"正解。プロンプトフローのバッチランは、データセット全体に対してフローを実行し、各行ごとに入力、出力、中間ノードの値(各LLM応答を含む)を記録する。" },
    { t:"CI ゲートとして送信されるカスタム評価フロー", c:false, e:"本来評価フローはバッチラン出力に対して品質メトリクスを計算する二次的なステップであり、行ごとの入出力を記録する仕組みそのものではない。" },
    { t:"トラフィックロギングが有効化されたプロンプトフローのデプロイ", c:false, e:"本来トラフィックロギング付きのデプロイ済みエンドポイントは本番リクエストをキャプチャするものであり、デプロイ前のデータセットテストの仕組みではない。" }
  ],
  summary:"500行のデータセットで全入出力・中間LLM応答を行ごとに確認＝バッチラン。Playground単一行テスト/評価フロー/トラフィックロギングはいずれも目的が異なる。",
  keywords:[
    { k:"prompt flow のテスト手法（Playground 単一行 vs バッチラン vs 評価フロー vs デプロイのトラフィック ロギング）", d:"バッチランによる行ごとの検証。" }
  ]
}

]);
