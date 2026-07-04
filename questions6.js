/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ6
 *  出典: Microsoft 提供 AI-103 学習資料「Microsoft Foundry で生成 AI チャット アプリを構築する」
 *  source:"AI-103"。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 *  keyword.k は glossary.js の「アプリ開発」カテゴリの term/alias に一致させる。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q130", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry ポータルのモデル プレイグラウンドでプロンプトを試した後、その設定を再現するコードをすぐに得たい。クリックすべきボタンはどれか。",
  choices:[
    { t:"[コード] ボタン", c:true, e:"チャット ウィンドウの[コード]ボタンを選ぶと、API(Responses/ChatCompletions等)・言語・SDK を選んで、現在の設定(プロジェクト エンドポイント・モデル デプロイ名・パラメーター)が事前設定されたコード サンプルを得られる。" },
    { t:"[評価] ボタン", c:false, e:"本来[評価]はテスト データセットと複数メトリックを使った体系的な評価を実行する機能。単発の対話設定を再現するコード サンプルを得る機能ではない。" },
    { t:"[デプロイ] ボタン", c:false, e:"本来[デプロイ]はモデルを新規にデプロイする操作。既にデプロイ済みのモデルの対話設定からコードを得る目的には使わない。" },
    { t:"モデル ランキングの[比較] ボタン", c:false, e:"本来これは複数モデルのベンチマークを横並び比較する機能。プレイグラウンドでの対話設定からコード サンプルを生成する機能ではない。" }
  ],
  summary:"プレイグラウンドの設定→即コード化＝[コード]ボタン。API/言語/SDKを選べ、エンドポイントやデプロイ名は事前設定済み。",
  keywords:[
    { k:"モデル プレイグラウンド", d:"コードを書かずにモデルへプロンプトを送り、温度/最大トークン等の設定調整、システム メッセージのカスタマイズができる対話環境。" }
  ]
},
{
  id:"q131", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry Agent Service を使ってエージェントを構築・管理し、ツール呼び出しの承認ワークフローやクラウド評価、トレースによる可観測性も使いたい。使うべき SDK はどれか。",
  choices:[
    { t:"Microsoft Foundry SDK（AIProjectClient）", c:true, e:"Foundry SDK はエージェント構築/管理(Agent Service)、ツール呼び出しと承認のワークフロー、クラウド評価、トレースと可観測性、Foundry ダイレクト モデルへのアクセスなど“Foundry 固有機能”を提供する。本要件はまさにこれらの機能。" },
    { t:"OpenAI SDK 単体", c:false, e:"本来 OpenAI SDK は OpenAI API 互換のモデル推論(チャット/応答/画像生成)に強く、既存 OpenAI コードとの互換性を重視する場面に向く。しかしエージェント管理・承認ワークフロー・クラウド評価・トレースといった“Foundry 固有機能”は提供しないため、本要件には不足する。" },
    { t:"Foundry Tools SDK", c:false, e:"本来これは Language/Speech/Translator 等の“既製 AI サービス”を呼ぶための専用ライブラリ。エージェント管理やトレースといったプロジェクト レベルの機能とは別物で、本要件には合わない。" },
    { t:"Azure CLI", c:false, e:"本来 Azure CLI はコマンドラインで Azure リソースを操作するツール。アプリケーション内からエージェントや評価、トレースにプログラムでアクセスする手段ではない。" }
  ],
  summary:"エージェント/評価/トレース/接続/Foundryダイレクトモデルが必要＝Foundry SDK(AIProjectClient)。OpenAI互換性重視ならOpenAI SDK。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"Foundry固有機能かOpenAI互換性重視かで選ぶ。" }
  ]
},
{
  id:"q132", domain:"genai", type:"single", source:"AI-103",
  q:"Python で Microsoft Foundry SDK の `AIProjectClient` を使ってプロジェクトに接続し、さらにチャット アプリケーションを開発したい。`azure-ai-projects` パッケージに加えて追加でインストールする必要があるものはどれか。",
  choices:[
    { t:"openai パッケージ", c:true, e:"Foundry SDK のチャット クライアント機能は OpenAI SDK から派生しているため、Foundry SDK でチャット アプリを開発する場合は openai パッケージのインポートも必要になる。" },
    { t:"azure-foundry パッケージ", c:false, e:"本来このような名前のパッケージは存在しない。Foundry SDK の Python パッケージ名は azure-ai-projects であり、追加で要るのは openai である。" },
    { t:"microsoft-foundry-sdk パッケージ", c:false, e:"本来これも実在しないパッケージ名。紛らわしい名称で受験者を惑わす誤りの選択肢。" },
    { t:"azure-storage-blob パッケージ", c:false, e:"本来これは Blob Storage を操作するための別ライブラリ。チャット クライアント機能を得るためのものではなく本要件に無関係。" }
  ],
  summary:"Foundry SDK でチャットするには azure-ai-projects に加えて openai パッケージも必要(チャット機能はOpenAI SDK由来)。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"azure-ai-projectsはopenaiパッケージに依存。" }
  ]
},
{
  id:"q133", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry SDK の `AIProjectClient` オブジェクトから、モデルにプロンプトを送信できる OpenAI 互換のチャット クライアントを取得したい。呼び出すべきメソッドはどれか。",
  choices:[
    { t:"project_client.get_openai_client()", c:true, e:"AIProjectClient の get_openai_client() メソッドで OpenAI 互換のクライアント オブジェクトを取得でき、そのままプロンプト送信や応答受信に使える。Foundry SDK と OpenAI SDK を橋渡しする典型パターン。" },
    { t:"project_client.get_connection()", c:false, e:"本来これに類する操作はリソース“接続”情報の取得に関わるもので、チャット用のOpenAI互換クライアントを直接返す想定のメソッドではない。" },
    { t:"project_client.deploy_model()", c:false, e:"本来モデルのデプロイ操作を行うような機能(仮にあったとしても)であり、既にデプロイ済みのモデルへチャットするクライアントを得る操作とは異なる。" },
    { t:"DefaultAzureCredential()", c:false, e:"本来これは認証情報(資格情報)を得るためのクラスであり、OpenAI互換のチャット クライアントそのものを返す関数ではない。AIProjectClient 生成時の credential 引数として渡すもの。" }
  ],
  summary:"AIProjectClientからチャットするには get_openai_client() でOpenAI互換クライアントを取得する。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"get_openai_client()がSDK間の橋渡し。" }
  ]
},
{
  id:"q134", domain:"genai", type:"single", source:"AI-103",
  q:"クライアント アプリが Foundry プロジェクトに接続する際、`https://{resource-name}.services.ai.azure.com/api/projects/<project-name>` という形式のエンドポイントはどれか。",
  choices:[
    { t:"プロジェクト エンドポイント", c:true, e:"この URL 形式はプロジェクト エンドポイント。Foundry ポータルのプロジェクト概要ページで確認でき、Foundry SDK(AIProjectClient)の接続や、Responses API 経由での Foundry 固有機能アクセスに使う。" },
    { t:"Azure OpenAI エンドポイント", c:false, e:"本来 Azure OpenAI エンドポイントは `https://{resource-name}.openai.azure.com/openai/v1` という別の形式。OpenAI 互換 API での呼び出しに使う入口であり、示された URL 形式とは一致しない。" },
    { t:"Foundry Tools エンドポイント", c:false, e:"本来 Foundry Tools エンドポイントは Language/Speech/Translator 等の既製サービスを呼ぶための別の入口。示されたプロジェクト単位の URL 形式とは異なる。" },
    { t:"Azure portal の URL", c:false, e:"本来これは Azure リソース管理用の Web ポータル(portal.azure.com)の URL。API 呼び出し用のエンドポイントではない。" }
  ],
  summary:"`.../api/projects/<project-name>` の形はプロジェクト エンドポイント。`.openai.azure.com/openai/v1` はAzure OpenAIエンドポイント。形式で見分ける。",
  keywords:[
    { k:"3 つの接続情報（キー / プロジェクト エンドポイント / Azure OpenAI エンドポイント）", d:"URL形式でエンドポイントの種類を見分ける。" }
  ]
},
{
  id:"q135", domain:"genai", type:"single", source:"AI-103",
  q:"既存の OpenAI 向けコード資産をほぼそのまま流用し、OpenAI API との最大限の互換性を保ちながらモデル推論(チャット応答生成)を行いたい。優先して選ぶべきものはどれか。",
  choices:[
    { t:"OpenAI SDK（Azure OpenAI エンドポイント経由）", c:true, e:"OpenAI SDK は OpenAI/Azure OpenAI/Foundry モデルに同じパターンでアクセスできる公式クライアント ライブラリ。既存コードの流用や OpenAI/Azure OpenAI 間の移植性を重視する本要件に最適。" },
    { t:"Foundry SDK のエージェント機能", c:false, e:"本来エージェント機能(Agent Service)は命令＋ツールを持つ自律的なエンティティを構築するための機能。単純なモデル推論の互換性重視という本要件には過剰かつ不一致。" },
    { t:"Foundry Tools SDK", c:false, e:"本来これは言語/音声/翻訳等の既製 AI サービス群を呼ぶためのライブラリで、生成 AI モデルへのチャット推論とは対象が異なる。" },
    { t:"Azure CLI 経由の REST 呼び出し", c:false, e:"本来 CLI は運用/管理タスクに向くコマンドライン ツールで、アプリケーション内に組み込む推論クライアントとしては不便かつ非現実的。" }
  ],
  summary:"OpenAI互換性最優先・既存コード流用＝OpenAI SDK。エージェント機能や既製ツールは目的が異なる。",
  keywords:[
    { k:"Foundry SDK（AIProjectClient）と OpenAI SDK の使い分け", d:"互換性重視ならOpenAI SDK。" }
  ]
},
{
  id:"q136", domain:"genai", type:"single", source:"AI-103",
  q:"アプリケーションで Microsoft Entra ID 認証を使って Azure OpenAI エンドポイントに接続したい。トークンを取得するために組み合わせるべき関数の対はどれか。",
  choices:[
    { t:"DefaultAzureCredential() と get_bearer_token_provider()", c:true, e:"DefaultAzureCredential で既定の Azure 資格情報を取得し、get_bearer_token_provider(credential, スコープ) でベアラー トークンを供給するプロバイダーを作る。これをクライアントの api_key 引数に渡すのが Entra ID 認証の定石パターン。" },
    { t:"os.getenv() と AZURE_OPENAI_API_KEY", c:false, e:"本来これは環境変数からAPIキー“文字列”を読み込むキー ベース認証のパターン。Microsoft Entra ID(トークン ベース)認証とは異なる仕組みであり、本要件(Entra ID 認証)には合わない。" },
    { t:"AzureOpenAI() と api_version のみ", c:false, e:"本来 AzureOpenAI クライアントの作成には認証情報とエンドポイントの両方が要る。api_version の指定だけでは認証は成立せず、Entra ID 認証の手段を問う本問には答えにならない。" },
    { t:"az login のみ", c:false, e:"本来 az login はローカル開発時に Azure CLI でサインインし、DefaultAzureCredential がその資格情報を拾えるようにする前提条件。しかしコード内でトークンを取得し使う仕組みそのものではないため、単独では本問の答えにならない。" }
  ],
  summary:"Entra ID認証の定石＝DefaultAzureCredential()＋get_bearer_token_provider()の組み合わせ。az loginはローカル前提条件。",
  keywords:[
    { k:"クライアント認証（Microsoft Entra ID / API キー / 環境変数）", d:"トークンプロバイダーの作り方。" }
  ]
},
{
  id:"q137", domain:"genai", type:"single", source:"AI-103",
  q:"アプリの環境変数に `OPENAI_BASE_URL` と `OPENAI_API_KEY` を設定しておいた。この場合、Python コードで最小限の記述でクライアントを作る方法として正しいものはどれか。",
  choices:[
    { t:"引数なしで OpenAI() を呼び出す", c:true, e:"OPENAI_BASE_URL と OPENAI_API_KEY の環境変数を設定していれば、OpenAI() を引数なしで呼び出すだけでクライアントが自動的にそれらの値を使う。" },
    { t:"必ず base_url と api_key を明示的に指定しなければならない", c:false, e:"本来環境変数が設定されていれば明示指定は不要——それが環境変数対応の利点である。『必ず明示指定が必要』は環境変数の自動認識という仕組みそのものを否定しており誤り。" },
    { t:"DefaultAzureCredential を必ず使わなければならない", c:false, e:"本来 DefaultAzureCredential は Entra ID 認証のための手段。環境変数に既にキーが設定されている本ケースでは、それとは別の認証経路であり必須ではない。" },
    { t:"AzureOpenAI クラスを使わないとエラーになる", c:false, e:"本来 OpenAI クラスは環境変数から base_url/api_key を読み取れるため、AzureOpenAI クラス必須という制約はない。" }
  ],
  summary:"OPENAI_BASE_URL/OPENAI_API_KEYを設定済みなら OpenAI() を引数無しで呼ぶだけでよい。",
  keywords:[
    { k:"クライアント認証（Microsoft Entra ID / API キー / 環境変数）", d:"環境変数の自動認識。" }
  ]
},
{
  id:"q138", domain:"genai", type:"single", source:"AI-103",
  q:"新規の生成 AI チャット アプリケーション プロジェクトで、複数ターンの会話状態をアプリ側で手動管理せずに維持したい。この目的に最も適した API と、そのための引数の組み合わせはどれか。",
  choices:[
    { t:"Responses API の previous_response_id パラメーター", c:true, e:"Responses API はステートフルで、直前の応答 ID を previous_response_id に渡すだけで会話の文脈が自動的に維持される。アプリ側で履歴配列を組み立て直す必要がなく、本要件に最も適する。" },
    { t:"ChatCompletions API の messages パラメーター", c:false, e:"本来 ChatCompletions はステートレスで、会話履歴を messages 配列としてアプリ側が“手動で”積み上げて毎回丸ごと送る必要がある。“手動管理せずに”という本要件には合わない。" },
    { t:"temperature パラメーター", c:false, e:"本来 temperature は出力のランダム性を制御するパラメーターで、会話状態の維持とは無関係。" },
    { t:"stream パラメーター", c:false, e:"本来 stream は応答を逐次受信するかどうかの設定で、会話の文脈維持の仕組みとは別軸。" }
  ],
  summary:"手動管理不要の文脈維持＝Responses APIのprevious_response_id。ChatCompletionsはmessages配列を都度手動で積む。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"previous_response_idがステートフルの鍵。" }
  ]
},
{
  id:"q139", domain:"genai", type:"single", source:"AI-103",
  q:"OpenAI 互換クライアントで ChatCompletions API を使い応答本文を取得する場合の正しいアクセス方法はどれか。",
  choices:[
    { t:"completion.choices[0].message.content", c:true, e:"ChatCompletions API の応答オブジェクトは choices 配列を持ち、その要素の message.content に生成された本文が入る。これが正しいアクセス経路。" },
    { t:"response.output_text", c:false, e:"本来これは Responses API の応答オブジェクトが持つプロパティ。ChatCompletions の応答オブジェクトにはこの形の属性はなく、API の種類を取り違えている。" },
    { t:"response.id のみ", c:false, e:"本来 id は応答の一意識別子であり、生成された本文(テキスト)そのものではない。本文取得の手段として不十分。" },
    { t:"completion.usage.total_tokens", c:false, e:"本来これは使用したトークン数の情報であり、生成された応答本文ではない。" }
  ],
  summary:"ChatCompletionsの本文取得＝choices[0].message.content。Responses APIのoutput_textと混同しないこと。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"応答本文の取り出し方の違い。" }
  ]
},
{
  id:"q140", domain:"genai", type:"single", source:"AI-103",
  q:"Responses API の応答オブジェクトから、この応答を生成するのに使われたトークンの合計数を確認したい。参照すべきプロパティはどれか。",
  choices:[
    { t:"response.usage.total_tokens", c:true, e:"response オブジェクトの usage プロパティには入力/出力/合計トークンの使用状況が含まれ、total_tokens で合計トークン数を確認できる。" },
    { t:"response.status", c:false, e:"本来 status は応答の状態(例: “completed”)を示すプロパティであり、トークン数の情報は含まれない。" },
    { t:"response.model", c:false, e:"本来 model は応答生成に使われたモデル名を示すプロパティで、トークン使用量とは無関係。" },
    { t:"response.id", c:false, e:"本来 id は応答を一意に識別するための ID であり、トークン数の情報ではない。" }
  ],
  summary:"トークン使用量はresponse.usage(total_tokens等)。status/model/idはそれぞれ別の情報。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"response オブジェクトの各プロパティの役割。" }
  ]
},
{
  id:"q141", domain:"genai", type:"single", source:"AI-103",
  q:"チャット アプリでモデルの動作(トーン・役割・禁止事項など)を設定したい。Responses API でこれを指定するパラメーターはどれか。",
  choices:[
    { t:"instructions", c:true, e:"Responses API では instructions パラメーターにモデルの動作をガイドする指示(いわゆるシステム プロンプト)を渡す。役割やトーンの設定はここで行う。" },
    { t:"input", c:false, e:"本来 input はユーザーからの実際のプロンプト(質問や依頼の本文)を渡すためのパラメーター。モデルの一般的な振る舞いを規定する指示とは役割が異なる。" },
    { t:"previous_response_id", c:false, e:"本来これは会話の文脈を維持するために直前の応答 ID を渡すパラメーターであり、モデルの動作(トーンや役割)を設定するものではない。" },
    { t:"max_output_tokens", c:false, e:"本来これは応答の最大トークン数を制限するパラメーターで、動作やトーンの設定とは無関係。" }
  ],
  summary:"Responses APIでの動作設定＝instructions。ユーザー本文はinput、文脈維持はprevious_response_id、長さ制限はmax_output_tokens。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"instructions＝システム指示に相当。" }
  ]
},
{
  id:"q142", domain:"genai", type:"single", source:"AI-103",
  q:"チャット アプリでモデルからの長い応答を待つ間、UI が反応しないように見える問題を解決したい。応答を少しずつ受信して表示する仕組みはどれか。",
  choices:[
    { t:"stream=True を指定したストリーミング応答", c:true, e:"stream=True を指定すると、応答が生成され次第、断片(delta)ごとに逐次受信できる。Responses API では response.output_text.delta イベントで部分テキストを受け取り、都度表示することで体感の応答性を高められる。" },
    { t:"AsyncOpenAI クライアントへの切り替えのみ", c:false, e:"本来非同期クライアントはブロッキングを避けて複数リクエストを並行処理するための仕組み。1つの応答を“少しずつ画面に表示する”という体感の改善には、非同期化だけでは直結せず、ストリーミングの導入が必要。" },
    { t:"temperature を下げる", c:false, e:"本来 temperature は出力のランダム性の制御であり、応答が届くタイミングや表示方法とは無関係。" },
    { t:"max_output_tokens を減らす", c:false, e:"本来これは応答の長さの上限を制限するだけで、逐次表示という体験そのものは実現しない(短くなるだけで一括受信のままなら待ち時間の体感問題は残り得る)。" }
  ],
  summary:"逐次表示によるUX改善＝ストリーミング(stream=True)。非同期化やパラメータ調整だけでは代替にならない。",
  keywords:[
    { k:"ストリーミング応答と非同期クライアント（stream=True / AsyncOpenAI）", d:"逐次受信で応答性を高める仕組み。" }
  ]
},
{
  id:"q143", domain:"genai", type:"single", source:"AI-103",
  q:"高パフォーマンスなアプリケーションで、長時間かかる可能性のあるモデル呼び出しの間もアプリ全体をブロックせず、複数の要求を同時に処理したい。使うべきクライアントと呼び出し方はどれか。",
  choices:[
    { t:"AsyncOpenAI クライアントを使い、各 API 呼び出しに await を付ける", c:true, e:"AsyncOpenAI は非ブロッキングな API 呼び出しを可能にする非同期クライアント。実行時間の長い要求や複数要求の同時処理に最適で、本要件に直接応える。" },
    { t:"OpenAI クライアントに stream=True を付けるだけ", c:false, e:"本来 stream=True は1つの応答を逐次受信する仕組みであり、複数要求を同時にブロッキングなく処理する非同期実行モデルの代わりにはならない。" },
    { t:"temperature=0 に固定する", c:false, e:"本来 temperature は出力の決定論性を制御するパラメーターで、処理のブロッキング/非同期とは無関係。" },
    { t:"AzureOpenAI クライアントに切り替えるだけ", c:false, e:"本来 AzureOpenAI クライアントは特定バージョンの Azure OpenAI API 機能を使うためのクライアントであり、それ自体が非同期実行を提供するわけではない(同期/非同期は別途 Async 系クラスを使うかで決まる)。" }
  ],
  summary:"非ブロッキング・並行処理＝AsyncOpenAI＋await。ストリーミングやパラメータ調整では代替できない。",
  keywords:[
    { k:"ストリーミング応答と非同期クライアント（stream=True / AsyncOpenAI）", d:"非同期クライアントの役割。" }
  ]
},
{
  id:"q144", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry プロジェクトの Azure OpenAI エンドポイントに接続し、特定の古いバージョンの Azure OpenAI API 機能をどうしても使う必要がある。この場合に作成すべきクライアント オブジェクトはどれか。",
  choices:[
    { t:"AzureOpenAI クライアント（api_version を明示指定）", c:true, e:"通常は OpenAI クライアントで Azure OpenAI v1 エンドポイントに接続すれば足りるが、特定バージョンの Azure OpenAI API 機能を使いたい場合は AzureOpenAI クライアントを作成し、azure_endpoint と api_version を明示的に指定する。" },
    { t:"OpenAI クライアント（バージョン指定なし）", c:false, e:"本来 OpenAI クライアントは Azure OpenAI v1 エンドポイントを介した一般的な利用に向くが、“特定バージョンの API 機能”を指定する仕組み(api_version)を持たないため、本要件の“特定の古いバージョン機能を使いたい”には応えられない。" },
    { t:"AIProjectClient", c:false, e:"本来これは Foundry 固有機能(エージェント/評価/トレース等)へのアクセスに使うクライアントで、Azure OpenAI API の特定バージョン指定とは目的が異なる。" },
    { t:"AsyncOpenAI クライアント", c:false, e:"本来これは非同期呼び出しのためのクライアントであり、特定の Azure OpenAI API バージョン機能を使うための手段ではない(同期/非同期の違いであり、バージョン指定の可否とは別軸)。" }
  ],
  summary:"特定バージョンのAzure OpenAI API機能が必要な場合はAzureOpenAIクライアント(api_version明示)。通常はOpenAIクライアントで十分。",
  keywords:[
    { k:"3 つの接続情報（キー / プロジェクト エンドポイント / Azure OpenAI エンドポイント）", d:"AzureOpenAIクライアントが必要になる特殊ケース。" }
  ]
},
{
  id:"q145", domain:"genai", type:"multi", source:"AI-103",
  q:"1 回のモデル推論実行で送信される「コンテキスト ウィンドウ」に含まれ得る要素を 3 つ選べ。",
  choices:[
    { t:"システムの指示（instructions、安全規則）", c:true, e:"モデルの振る舞いを規定するシステム指示は、毎回コンテキストに含まれ送信される要素の一つ。" },
    { t:"会話履歴（これまでのユーザー/アシスタントのやり取り）", c:true, e:"文脈維持のため、過去のやり取りもコンテキストに含まれて送信される(Responses APIのprevious_response_idを使っていても内部的には履歴が参照される)。" },
    { t:"ツール スキーマとツール出力（関数定義・検索結果・コード実行結果など）", c:true, e:"関数呼び出しの定義(スキーマ)や、それを実行して得られた結果(ツール出力)もコンテキストに含まれてモデルに渡される。" },
    { t:"Azure サブスクリプションの請求情報", c:false, e:"本来サブスクリプションの請求情報は Azure Cost Management 側で管理される情報であり、モデル推論のコンテキスト ウィンドウには含まれない。" },
    { t:"開発者の Windows ログイン パスワード", c:false, e:"本来これはローカル端末の認証情報であり、モデルへ送信されるコンテキストの一部では全くない。" }
  ],
  summary:"コンテキストに含まれるのは指示・プロンプト・履歴・ツールスキーマ/出力・取得ドキュメント等。請求情報やローカル認証情報は含まれない。",
  keywords:[
    { k:"コンテキスト ウィンドウに含まれる要素とトークン消費", d:"何が毎回送信されるか。" }
  ]
},
{
  id:"q146", domain:"genai", type:"single", source:"AI-103",
  q:"Responses API の previous_response_id を使って会話の文脈を維持するようにした。この変更によってトークンの使用量(コスト)はどうなるか。",
  choices:[
    { t:"会話が長引くほど、依然としてトークン使用量は増えていく", c:true, e:"previous_response_id は“履歴を手動で書き直す手間”を省く便利機能であって、内部的には会話履歴やツール関連情報が毎回まとめてモデルに送られる。したがって会話が長くなるほどトークン消費は増加し続ける。" },
    { t:"previous_response_id を使えば、トークン使用量は自動的に安くなる", c:false, e:"本来 previous_response_id は状態“管理”の利便性を提供するだけで、コンテキストの内容量そのものを圧縮・削減する機能ではない。トークン消費が自動的に下がるという説明は誤り。" },
    { t:"previous_response_id を使うと、常にゼロトークンで応答が得られる", c:false, e:"本来推論には必ず何らかのトークンが使われる。previous_response_id の有無に関わらずゼロトークンにはならない。" },
    { t:"previous_response_id は課金方式をトークン制から固定料金制に変える", c:false, e:"本来これは会話状態管理のための API パラメーターであり、Azure OpenAI の課金方式(トークン単位の従量課金)自体を変更する機能ではない。" }
  ],
  summary:"previous_response_idは状態“管理”の利便性のみを提供。コンテキストの中身は結局毎回送信されるためトークン消費は減らない。",
  keywords:[
    { k:"コンテキスト ウィンドウに含まれる要素とトークン消費", d:"previous_response_idはコスト削減機能ではない。" }
  ]
},
{
  id:"q147", domain:"genai", type:"single", source:"AI-103",
  q:"ChatCompletions API を使って複数ターンの会話を実装する。2 回目のユーザー発話を送る際にモデルへ渡すべき messages 配列の内容として正しいものはどれか。",
  choices:[
    { t:"システム メッセージ＋1回目のユーザー メッセージ＋1回目のアシスタント応答＋2回目のユーザー メッセージ、をすべて含めた配列", c:true, e:"ChatCompletions はステートレスなので、文脈を維持するには過去のやり取り(システム/ユーザー/アシスタントの全メッセージ)を毎回配列にまとめてアプリ側から送る必要がある。" },
    { t:"2回目のユーザー メッセージだけを含む配列", c:false, e:"本来 ChatCompletions はサーバー側で履歴を自動保持しないため、2回目のメッセージだけを送るとモデルは1回目のやり取りの文脈を認識できず、文脈が失われる。" },
    { t:"previous_response_id パラメーターに1回目の応答IDを指定する", c:false, e:"本来 previous_response_id は Responses API 専用のパラメーターであり、ChatCompletions API のリクエストには存在しない。API の種類を取り違えている。" },
    { t:"システム メッセージだけを含む配列", c:false, e:"本来システム メッセージだけではユーザーの実際の発話が含まれず、意味のある応答を得られない。" }
  ],
  summary:"ChatCompletionsは毎回“全会話履歴”をmessages配列に積んで送る必要がある(ステートレス)。previous_response_idはResponses API専用。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"ChatCompletionsは手動で履歴管理。" }
  ]
},
{
  id:"q148", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry プロジェクトで、Azure OpenAI モデルだけでなく Microsoft Phi や DeepSeek のような“Foundry ダイレクト モデル”ともチャットしたい。Responses API を使ってこれを実現するために接続すべきエンドポイントはどれか。",
  choices:[
    { t:"プロジェクト エンドポイント（Foundry SDK または AzureOpenAI クライアント経由）", c:true, e:"プロジェクト エンドポイントに接続すれば、Responses API は Azure OpenAI モデルと Foundry ダイレクト モデル(Azure OpenAI 以外のモデル)の両方で動作する。Foundry ダイレクト モデルを使いたい本要件に合致する。" },
    { t:"Azure OpenAI エンドポイントのみ", c:false, e:"本来 Azure OpenAI エンドポイントは Azure OpenAI が提供するモデル群を対象とする入口。Microsoft Phi や DeepSeek のような Foundry ダイレクト モデルへのアクセスを主眼とする本要件には、プロジェクト エンドポイント経由の方が適する。" },
    { t:"Foundry Tools エンドポイントのみ", c:false, e:"本来これは Language/Speech/Translator 等の既製 AI サービスを呼ぶための入口であり、生成 AI モデルとのチャットには使わない。" },
    { t:"ローカルの Ollama エンドポイント", c:false, e:"本来 Ollama はローカルで LLM を動かす別の OSS ツールであり、Microsoft Foundry のプロジェクトやダイレクト モデルとは無関係。" }
  ],
  summary:"Foundryダイレクトモデル(Azure OpenAI以外)を含めて扱うにはプロジェクト エンドポイント経由が必要。Azure OpenAIエンドポイントだけでは対象が限定される。",
  keywords:[
    { k:"3 つの接続情報（キー / プロジェクト エンドポイント / Azure OpenAI エンドポイント）", d:"Foundryダイレクトモデルの対応可否。" }
  ]
},
{
  id:"q149", domain:"genai", type:"single", source:"AI-103",
  q:"Foundry モデルで OpenAI API を最も幅広くサポートしているエンドポイントはどれか。",
  choices:[
    { t:"Azure OpenAI エンドポイント", c:true, e:"Azure OpenAI エンドポイントは OpenAI の API(Chat Completions/Responses等)との互換性を主目的とする入口で、OpenAI API のサポート範囲が最も広い。既存の OpenAI SDK/構文をそのまま活かせる。" },
    { t:"Foundry プロジェクト エンドポイント", c:false, e:"本来プロジェクト エンドポインもモデルへのアクセスを提供するが、主眼は Foundry 固有 API(Agent サービス等)へのアクセスであり、“OpenAI API の幅広いサポート”という観点では Azure OpenAI エンドポイントほど専用化されていない。" },
    { t:"Foundry Tools のエンドポイント", c:false, e:"本来これは Language/Speech/Translator 等の既製 AI サービスを呼ぶための入口であり、OpenAI API のサポートとは無関係。" },
    { t:"Azure portal のエンドポイント", c:false, e:"本来 Azure portal は管理 Web UI であり、そもそも OpenAI API のようなプログラム呼び出し用エンドポイントではない。" }
  ],
  summary:"OpenAI API を最も広くサポート＝Azure OpenAIエンドポイント。プロジェクトエンドポイントはFoundry固有機能寄り。",
  keywords:[
    { k:"3 つの接続情報（キー / プロジェクト エンドポイント / Azure OpenAI エンドポイント）", d:"OpenAI APIサポート範囲の違い。" }
  ]
}

]);
