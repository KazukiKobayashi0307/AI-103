/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ8 (q170-q195)
 *  出典: 「生成 AI ソリューションでツールを使用する」資料 + 過去分野の再構成。
 *  新形式: code穴埋め問題(q.code に空欄、choicesが候補コード片)、
 *          正しいコード選択問題(choicesそのものがコード行、q.mono=trueで等幅表示)。
 *  ※ コードを含む文字列はバッククォート(テンプレートリテラル)で記述し、
 *    ダブルクォート/シングルクォートの混在によるJS構文破壊を避ける。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q170", domain:"genai", type:"single", source:"AI-103",
  q:"社内でアップロードしたポリシー ドキュメント（PDF）の内容に基づいて、モデルに質問へ回答させたい。tools配列に指定すべきツールはどれか。",
  choices:[
    { t:"file_search", c:true, e:"file_search はアップロード済みファイル(ベクター ストア)を意味的に検索できるツール。特定の非公開資料に根拠づけた回答をしたい本要件に直接対応する。" },
    { t:"web_search", c:false, e:"本来 web_search はインターネット上の公開情報を検索するツール。アップロードした“社内限定”のポリシー文書はインターネットに存在しないため、この文書内容を検索する手段にはならない。" },
    { t:"code_interpreter", c:false, e:"本来 code_interpreter は Python コードを実行して計算やデータ処理を行うツール。文書の内容を検索して回答する機能ではない。" },
    { t:"function", c:false, e:"本来 function はアプリ独自の関数呼び出しを行う仕組み。文書検索のための専用実装(ベクター ストア連携等)を自前で用意しない限り、既製の file_search の代わりにはならない。" }
  ],
  summary:"アップロード済み社内文書への根拠づけ＝file_search。公開Web情報＝web_search、計算実行＝code_interpreter、独自システム連携＝function。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"4種の目的の違い。" }
  ]
},
{
  id:"q171", domain:"genai", type:"single", source:"AI-103",
  q:"function ツールを使うチャット アプリで、モデルの応答に `function_call` タイプの項目が含まれていた。アプリが次に行うべきことはどれか。",
  choices:[
    { t:"コード内でその関数を実際に実行し、結果を function_call_output としてモデルに送り返す", c:true, e:"モデルは関数呼び出しの“指示”を返すだけで、実行はしない。アプリ側コードが指示された引数で関数を実行し、その結果を function_call_output（call_id 付き）としてモデルに返送するのが正しい対応。" },
    { t:"モデルが自動的に関数を実行するのを待つ", c:false, e:"本来モデルには任意コードを実行する権限がなく、“待っていても”実行されることはない。関数呼び出しの実行はアプリの責務であり、この選択は function calling の仕組みそのものを誤解している。" },
    { t:"function_call の内容を web_search 要求に変換する", c:false, e:"本来 function_call と web_search は無関係な別のツール機構。呼び出し指示を別ツールの要求に変換するという操作自体、function calling の設計に存在しない。" },
    { t:"ユーザーに関数を手動で実行するよう案内する", c:false, e:"本来 function calling はアプリが自動的に関数を実行し結果をモデルへ返すことで完結する仕組み。ユーザーへ手動実行を求めるのは設計の意図に反し、体験も損なう。" }
  ],
  summary:"function_callを受け取ったら、アプリがコードで実行しfunction_call_output(call_id付き)を送り返す。モデルは実行しない。",
  keywords:[
    { k:"Azure OpenAI の function calling 実行フロー（Responses API の実装詳細）", d:"function_call受領後の正しい対応。" }
  ]
},
{
  id:"q172", domain:"genai", type:"single", source:"AI-103",
  q:"code_interpreter ツールに関する説明として正しいものはどれか。",
  choices:[
    { t:"サンドボックス環境で Python コードを実行し、タスクの解決に役立てることができる", c:true, e:"code_interpreter はモデルが動的に Python コードを書いて実行できるサンドボックス環境。数式計算・データ処理・ファイル変換などタスクの実行に役立つ。" },
    { t:"コードの実行中に外部 Web サイトを直接参照できる", c:false, e:"本来 code_interpreter の実行環境には“外部ネットワーク アクセスが無い”という明確な制限がある。Web サイトの参照が必要なら web_search ツールを別途使う必要があり、この説明は制限事項に反する。" },
    { t:"ファイルのアップロードのみをサポートし、計算を実行することはできない", c:false, e:"本来 code_interpreter はファイルの処理(アップロード/ダウンロード)に加え、計算・統計分析・データ変換などを実際に“実行”できる。『計算を実行できない』は主要機能を否定しており誤り。" },
    { t:"実行時間や外部アクセスの制限は一切ない", c:false, e:"本来 code_interpreter には実行時間の長い操作へのタイムアウト制限、外部ネットワーク アクセスなし、メモリ制約といった既知の制限がある。『制限は一切ない』は事実に反する。" }
  ],
  summary:"code_interpreterはサンドボックスでPythonを実行できるが、外部ネットワークアクセスなし・タイムアウト制限ありという制約を持つ。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"code_interpreterの能力と制限。" }
  ]
},
{
  id:"q173", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"以下は Responses API でモデルに web_search ツールを使わせるための tools 指定である。空欄に入る正しい値はどれか。",
  code:`response = client.responses.create(
    model=model_deployment,
    instructions="You are an AI assistant.",
    input="What are three major announcements from Microsoft Build this week?",
    tools=[{"type": ______}]
)`,
  choices:[
    { t:`"web_search"`, c:true, e:"web_search ツールの type 値は文字列 'web_search'。これを指定することでモデルがインターネット検索を使えるようになる。" },
    { t:`"websearch"`, c:false, e:"本来ツール タイプ名にアンダースコアが必須で、'websearch'（アンダースコアなし）という綴りのツールタイプは定義されていない。単純な綴りミスの選択肢。" },
    { t:`web_search`, c:false, e:"本来 JSON/Python の辞書では文字列値を引用符で囲む必要がある。引用符なしの `web_search` は未定義の変数参照として扱われエラーになる。" },
    { t:`"search"`, c:false, e:"本来ツール タイプ名は 'search' ではなく 'web_search'。'search' だけでは web_search ツールとして認識されない。" }
  ],
  summary:"web_searchツールのtype値は文字列'web_search'。引用符必須、綴り・省略形に注意。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"web_searchのtools指定。" }
  ]
},
{
  id:"q174", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"以下は file_search ツールで、作成済みのベクター ストアを検索対象として指定するコードである。空欄に入る正しいパラメーター名はどれか。",
  code:`response = client.responses.create(
    model=model_deployment,
    input="What's the maximum amount I can claim for a taxi ride?",
    tools=[{
        "type": "file_search",
        ______: [vector_store.id]
    }]
)`,
  choices:[
    { t:`"vector_store_ids"`, c:true, e:"file_search ツールでは検索対象のベクター ストアを 'vector_store_ids'（複数形・リスト）というキーで指定する。1つでもリストとして渡す点がポイント。" },
    { t:`"vector_store_id"`, c:false, e:"本来正しいキー名は複数形の 'vector_store_ids'。単数形の 'vector_store_id' という綴りは file_search ツールの仕様に存在しない。" },
    { t:`"store_ids"`, c:false, e:"本来正しいキーは 'vector_store_ids' であり、'vector_store' を省略した 'store_ids' という短縮形は定義されていない。" },
    { t:`"index"`, c:false, e:"本来 'index' というキーは file_search ツールのパラメーターとして使われない。Azure AI Search 等の別サービスの概念と混同した誤りの選択肢。" }
  ],
  summary:"file_searchのベクターストア指定キーは複数形の'vector_store_ids'（リスト形式）。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"file_searchのパラメーター名。" }
  ]
},
{
  id:"q175", domain:"genai", type:"multi", source:"AI-103",
  q:"file_search ツールを使うチャット アプリを構築する。正しい実装手順の要素を3つ選べ。",
  choices:[
    { t:"vector_stores.create() でベクター ストアを作成する", c:true, e:"検索対象となるベクター ストアをまず作成する必要がある最初のステップ。" },
    { t:"file_batches.upload_and_poll() でファイルをベクター ストアへアップロードする", c:true, e:"作成したベクター ストアへ実際のドキュメント(PDF等)をアップロードし、インデックス化が完了するまで待つステップ。" },
    { t:"tools配列で type を file_search にし、vector_store_ids に作成したストアの id を指定する", c:true, e:"リクエスト時にこのツール定義を渡すことで、モデルがそのベクター ストアを検索できるようになる。" },
    { t:"アップロードするファイルを事前に手動でテキストへ変換しておく", c:false, e:"本来 file_search はアップロードされたファイル(PDF等)を自動的に処理してインデックス化するため、事前の手動テキスト変換は不要な手間。" },
    { t:"Azure AI Search リソースを別途プロビジョニングする", c:false, e:"本来 file_search はベクター ストア機能を内包しており、別途 Azure AI Search リソースを用意することは本要件(Responses APIのfile_search利用)には必須ではない。" }
  ],
  summary:"file_search実装の3ステップ＝①vector_stores.create()②file_batches.upload_and_poll()③tools配列でvector_store_ids指定。手動変換や別リソースは不要。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"file_search実装の流れ。" }
  ]
},
{
  id:"q176", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"以下は function calling の応答処理コードの一部である。モデルの応答に含まれる項目が「関数呼び出し」であるかを判定する条件として、空欄に入る正しいコードはどれか。",
  code:`for item in response.output:
    if ______ and item.name == "get_time":
        current_time = get_time()
        messages.append({
            "type": "function_call_output",
            "call_id": item.call_id,
            "output": current_time
        })`,
  choices:[
    { t:`item.type == "function_call"`, c:true, e:"response.output の各要素は type プロパティを持ち、関数呼び出しを表す項目は type が 'function_call' になる。これで判定してから item.name をチェックするのが正しい流れ。" },
    { t:`item.role == "function_call"`, c:false, e:"本来 role はメッセージの発信者(user/assistant/developer等)を表すプロパティで、項目の種類(関数呼び出しかどうか)を示すものではない。判定には type を使う。" },
    { t:`item == "function_call"`, c:false, e:"本来 item はオブジェクト(項目)であり、文字列との直接比較では常に False になる。プロパティ(type)を参照する必要がある。" },
    { t:`item.name == "function_call"`, c:false, e:"本来 name プロパティには“呼び出された関数の名前”(例: 'get_time')が入り、項目の種類を表す文字列ではない。種類の判定には type を使う。" }
  ],
  summary:"関数呼び出し項目の判定は item.type==\"function_call\"。roleやnameとの混同に注意。",
  keywords:[
    { k:"Azure OpenAI の function calling 実行フロー（Responses API の実装詳細）", d:"item.typeでの判定方法。" }
  ]
},
{
  id:"q177", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"function calling で関数の実行結果をモデルへ返す際、要求と結果を正しく対応づけるために必須のキーはどれか。",
  code:`messages.append({
    "type": "function_call_output",
    ______: item.call_id,
    "output": current_time
})`,
  choices:[
    { t:`"call_id"`, c:true, e:"call_id は要求(function_call)と結果(function_call_output)を対応付けるための必須キー。これが無い、または元の呼び出しの call_id と一致しないと、モデルはどの呼び出しへの結果か判別できない。" },
    { t:`"id"`, c:false, e:"本来 function_call_output で使う対応付けキーは 'call_id' という specific な名前。単なる 'id' は仕様上の正しいキー名ではない。" },
    { t:`"name"`, c:false, e:"本来 name は関数名を表すのに使われるプロパティで、要求と結果を対応付けるための識別子ではない。" },
    { t:`"response_id"`, c:false, e:"本来 response_id という概念は Responses API の応答全体の ID(previous_response_id 等で使う)であり、個々の関数呼び出しの対応付けには call_id を使う。混同しやすい選択肢。" }
  ],
  summary:"function_call_outputの対応付けキーはcall_id。id/name/response_idと混同しないこと。",
  keywords:[
    { k:"Azure OpenAI の function calling 実行フロー（Responses API の実装詳細）", d:"call_idの役割。" }
  ]
},
{
  id:"q178", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"Microsoft Entra ID 認証で Azure OpenAI エンドポイントに接続する OpenAI クライアントを正しく初期化しているコードはどれか。",
  choices:[
    { t:`token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default")
openai_client = OpenAI(base_url=azure_openai_endpoint, api_key=token_provider)`, c:true, e:"DefaultAzureCredential で既定の資格情報を取得し、get_bearer_token_provider でスコープ付きのトークン プロバイダーを作成、それをクライアントの api_key 引数に渡す——これが Entra ID 認証の正しい定石パターン。" },
    { t:`openai_client = OpenAI(base_url=azure_openai_endpoint, api_key="sk-my-secret-key-12345")`, c:false, e:"本来これはキー文字列を直接コードに埋め込むアンチパターン。Entra ID 認証（トークン ベース）ではなく、しかもキーをハードコードしており漏えいリスクの観点でも不適切。" },
    { t:`openai_client = OpenAI(base_url=azure_openai_endpoint, api_key=DefaultAzureCredential())`, c:false, e:"本来 DefaultAzureCredential のインスタンスをそのまま api_key に渡しても正しく認証できない。get_bearer_token_provider を介してベアラー トークンを供給する関数にする必要があり、この手順が欠けている。" },
    { t:`openai_client = AzureCredential(base_url=azure_openai_endpoint)`, c:false, e:"本来 'AzureCredential' という名前のクラスは存在しない（正しくは DefaultAzureCredential）。また OpenAI クライアントの初期化にもなっていない、複合的に誤ったコード。" }
  ],
  mono:true,
  summary:"Entra ID認証＝DefaultAzureCredential()＋get_bearer_token_provider()でトークンプロバイダーを作り、api_key引数に渡す。",
  keywords:[
    { k:"クライアント認証（Microsoft Entra ID / API キー / 環境変数）", d:"正しい初期化パターン。" }
  ]
},
{
  id:"q179", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"Responses API で、モデルの役割・トーンを規定するシステム プロンプトを正しく渡しているコードはどれか。",
  choices:[
    { t:`response = client.responses.create(
    model=model_deployment,
    instructions="You are a helpful AI assistant.",
    input=user_text
)`, c:true, e:"Responses API ではシステム プロンプトに相当する内容を instructions パラメーターに渡す。input にはユーザーの実際のプロンプトを渡すのが正しい役割分担。" },
    { t:`response = client.responses.create(
    model=model_deployment,
    system="You are a helpful AI assistant.",
    input=user_text
)`, c:false, e:"本来 Responses API に 'system' という名前のパラメーターは存在しない。ChatCompletions API の role='system' メッセージと混同した誤り。" },
    { t:`response = client.chat.completions.create(
    model=model_deployment,
    instructions="You are a helpful AI assistant.",
    input=user_text
)`, c:false, e:"本来 chat.completions.create() は ChatCompletions API のメソッドで、instructions や input という引数は取らない（messages配列を使う）。API の種類とパラメーターの組み合わせを取り違えている。" },
    { t:`response = client.responses.create(
    model=model_deployment,
    input="You are a helpful AI assistant.",
    instructions=user_text
)`, c:false, e:"本来 instructions にはシステム指示、input にはユーザー入力を渡すべきだが、この選択肢では役割が入れ替わっている（システム指示をinputに、ユーザー発話をinstructionsに）。" }
  ],
  summary:"Responses APIのシステム指示＝instructions引数、ユーザー入力＝input引数。'system'引数やAPIの取り違えに注意。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"instructions/inputの正しい使い方。" }
  ]
},
{
  id:"q180", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"ChatCompletions API を使って生成された応答の本文テキストを正しく取得しているコードはどれか。",
  choices:[
    { t:`completion = client.chat.completions.create(model=model_deployment, messages=messages)
print(completion.choices[0].message.content)`, c:true, e:"ChatCompletions API の応答オブジェクトは choices 配列を持ち、その要素の message.content に生成された本文が入る。これが正しいアクセス方法。" },
    { t:`completion = client.chat.completions.create(model=model_deployment, messages=messages)
print(completion.output_text)`, c:false, e:"本来 output_text は Responses API の応答オブジェクトが持つプロパティ。ChatCompletions の応答オブジェクトには存在せず、この呼び出しはエラーになる。" },
    { t:`completion = client.chat.completions.create(model=model_deployment, messages=messages)
print(completion.text)`, c:false, e:"本来 ChatCompletions の応答オブジェクトに 'text' という直接プロパティは無い。本文は choices[0].message.content という階層を経て取得する必要がある。" },
    { t:`completion = client.chat.completions.create(model=model_deployment, messages=messages)
print(completion.message)`, c:false, e:"本来 'message' は choices配列の各要素が持つプロパティであり、completion オブジェクト自体の直下には無い。choices[0].message.content が正しい経路。" }
  ],
  summary:"ChatCompletionsの本文取得はcompletion.choices[0].message.content。output_text（Responses API用）と混同しないこと。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"ChatCompletionsの正しい応答取得コード。" }
  ]
},
{
  id:"q181", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"以下は複数ターンの会話で、前回の応答 ID を使って文脈を維持する Responses API 呼び出しである。空欄に入る正しいコードはどれか。",
  code:`response = openai_client.responses.create(
    model=model_deployment,
    instructions="You are a helpful AI assistant.",
    input=input_text,
    ______=last_response_id
)
last_response_id = response.id`,
  choices:[
    { t:`previous_response_id`, c:true, e:"previous_response_id パラメーターに直前の応答 ID を渡すことで、Responses API が内部的に会話の文脈を維持する。ステートフルな会話継続の正しい実装。" },
    { t:`conversation_id`, c:false, e:"本来 Responses API のパラメーター名として 'conversation_id' というものは存在しない。文脈維持には previous_response_id を使う。" },
    { t:`messages`, c:false, e:"本来 messages は ChatCompletions API で使う会話履歴配列のパラメーター名。Responses API では input と previous_response_id の組み合わせで文脈を扱う。" },
    { t:`session_id`, c:false, e:"本来これも Responses API の実在するパラメーターではない。セッション管理を想起させる紛らわしい名称だが、正しくは previous_response_id。" }
  ],
  summary:"Responses APIの文脈維持はprevious_response_idパラメーター。conversation_id/session_id/messagesは誤り。",
  keywords:[
    { k:"Responses API と ChatCompletions API の違い", d:"previous_response_idの正しい使用。" }
  ]
},
{
  id:"q182", domain:"genai", type:"single", source:"AI-103", mono:true,
  q:"file_search と web_search の両方を同時に使えるようにする、正しい tools 配列の指定はどれか。",
  choices:[
    { t:`tools=[
    {"type": "file_search", "vector_store_ids": [vector_store.id]},
    {"type": "web_search"}
]`, c:true, e:"tools は配列であり、複数のツール定義を要素として並べることで、モデルは状況に応じてどちらのツールを使うか(あるいは両方使うか)を自律的に判断できる。これが正しい書き方。" },
    { t:`tools={"type": "file_search", "vector_store_ids": [vector_store.id], "type": "web_search"}`, c:false, e:"本来これは単一の辞書であり、しかも 'type' キーが2回定義されて後の値で上書きされてしまう。ツールを複数指定するには配列(リスト)にする必要がある。" },
    { t:`tools=["file_search", "web_search"]`, c:false, e:"本来各ツールは辞書(type等のプロパティを持つオブジェクト)として指定する必要がある。単なる文字列のリストでは vector_store_ids 等の必須パラメーターを渡せず、ツール定義として不完全。" },
    { t:`tool="file_search+web_search"`, c:false, e:"本来パラメーター名は複数形の 'tools' であり、単数形の 'tool' ではない。また値も配列であるべきで、'+' で連結した単一文字列という形式も存在しない。" }
  ],
  summary:"複数ツールの同時指定はtools配列に複数の辞書を並べる。モデルが状況に応じて自律的に使い分ける。",
  keywords:[
    { k:"ツール選択の既定動作（モデルが自律的に選ぶ）と instructions によるガイド", d:"複数ツール指定の正しい書き方。" }
  ]
},
{
  id:"q183", domain:"genai", type:"single", source:"AI-103",
  q:"複数のツール(file_search, web_search, code_interpreterなど)を tools 配列にまとめて渡した。既定では、実際にどのツールを使うかは誰が決定するか。",
  choices:[
    { t:"モデルがプロンプトの内容に基づいて自律的に判断する", c:true, e:"既定では、どのツールをいつ使うか(あるいは使わないか)はモデルがプロンプト内容から自律的に判断する。開発者は毎回明示的にツールを選択する必要はない。" },
    { t:"アプリ開発者が API 呼び出しのたびに使用ツールを1つだけ手動選択しなければならない", c:false, e:"本来複数ツールをまとめて渡しておき、モデルに判断させるのが基本パターン。毎回手動で1つに絞る必要はなく、この説明は既定動作を誤解している。" },
    { t:"常に配列内の最初のツールが使われる", c:false, e:"本来ツールの選択は配列内の並び順ではなく、モデルによるプロンプト内容の解釈に基づく。『常に最初』という機械的なルールは存在しない。" },
    { t:"ユーザーがチャット画面でツールを都度選択する UI が必須", c:false, e:"本来ツール選択はモデル側の自律判断で完結し、エンドユーザーに毎回選ばせる UI は必須要件ではない（開発者判断で追加は可能だが、既定動作の説明としては誤り）。" }
  ],
  summary:"複数ツールを渡した場合、既定ではモデルがプロンプトから自律的に使うツールを判断する。instructionsで誘導は可能。",
  keywords:[
    { k:"ツール選択の既定動作（モデルが自律的に選ぶ）と instructions によるガイド", d:"既定のツール選択主体。" }
  ]
},
{
  id:"q184", domain:"genai", type:"single", source:"AI-103",
  q:"file_search ツールで特定ファイル集合への回答根拠づけを行っていたが、複数の異なるデータ ストアにまたがる大規模なエンタープライズ ナレッジ検索が必要になった。この場合に検討すべきものはどれか。",
  choices:[
    { t:"Foundry IQ（複数ナレッジ ソースを1つの中央MCP接続に集約する仕組み）", c:true, e:"file_search は特定のアップロード済みファイル集合への固定に強いが、複数データ ストアにまたがる大規模検索には、複数ナレッジ ソースを統合できる Foundry IQ を検討するのが資料の推奨。" },
    { t:"code_interpreter を追加してデータを処理する", c:false, e:"本来 code_interpreter は Python コードの実行環境であり、複数データ ストアを横断する検索・統合の仕組みではない。目的が異なる。" },
    { t:"web_search に切り替える", c:false, e:"本来 web_search は公開インターネット情報の検索用。社内の複数データ ストアという非公開情報の統合検索には使えない。" },
    { t:"vector_store の数を1つに減らす", c:false, e:"本来複数データ ストアにまたがる検索が要件なのに、ストア数を減らすことは要件と逆行する対応であり解決にならない。" }
  ],
  summary:"file_searchは特定ファイル集合向け。複数データストアの大規模統合検索にはFoundry IQを検討する。",
  keywords:[
    { k:"Foundry IQ", d:"複数ナレッジソースの中央集約。" },
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"file_searchの規模限界。" }
  ]
},
{
  id:"q185", domain:"vision", type:"single", mono:true,
  q:"Azure AI Document Intelligence で、事前構築済みの請求書モデルを使ってドキュメントを解析する正しい呼び出しはどれか。",
  choices:[
    { t:`poller = document_intelligence_client.begin_analyze_document(
    "prebuilt-invoice", document_bytes
)
result = poller.result()`, c:true, e:"事前構築済みモデルを使う場合、begin_analyze_document の第一引数にモデル ID(請求書なら 'prebuilt-invoice')を渡す。長時間実行操作のため poller を経由し、result() で最終結果を取得する。" },
    { t:`result = document_intelligence_client.analyze_invoice(document_bytes)`, c:false, e:"本来 Document Intelligence SDK にこのような専用メソッド名(analyze_invoice)は存在しない。すべてのモデル解析は共通の begin_analyze_document にモデル ID を渡す形で行う。" },
    { t:`poller = document_intelligence_client.begin_analyze_document(
    "prebuilt-read", document_bytes
)
result = poller.result()`, c:false, e:"本来 'prebuilt-read' は文字と言語のみを読み取る Read モデルの ID。合計金額や請求書番号など請求書特有のフィールドを抽出するには 'prebuilt-invoice' を指定する必要があり、モデル ID の選択が誤っている。" },
    { t:`result = document_intelligence_client.begin_analyze_document("prebuilt-invoice", document_bytes)`, c:false, e:"本来 begin_analyze_document は長時間実行操作(LRO)を表す poller オブジェクトを返す。それを直接 result として扱っても解析結果は得られず、poller.result() の呼び出しが欠けている。" }
  ],
  summary:"prebuiltモデルの解析はbegin_analyze_document(モデルID, 文書)→poller.result()。請求書は'prebuilt-invoice'を指定。",
  keywords:[
    { k:"Document Intelligence モデル（Read / Layout / 一般ドキュメント[非推奨] / prebuilt / custom[template vs neural] / composed）", d:"SDK呼び出しの正しい形。" }
  ]
},
{
  id:"q186", domain:"vision", type:"single", mono:true,
  q:"Custom Vision で学習済みイテレーションを発行（Publish）し、Prediction リソースで使えるようにする正しい呼び出しはどれか。",
  choices:[
    { t:`trainer.publish_iteration(
    project_id, iteration_id, publish_name, prediction_resource_id
)`, c:true, e:"publish_iteration は Training クライアント(trainer)から呼び、プロジェクトID・イテレーションID・公開名・Prediction リソースIDを渡す。これにより指定したPredictionリソースでそのイテレーションが使えるようになる。" },
    { t:`predictor.publish_iteration(project_id, iteration_id, publish_name)`, c:false, e:"本来発行操作は Training クライアント(trainer)が行う操作であり、推論用の predictor クライアントのメソッドではない。また Prediction リソースIDの指定も欠けている。" },
    { t:`trainer.train_project(project_id)`, c:false, e:"本来 train_project はモデルの“学習”を開始するメソッドであり、学習済みイテレーションを“発行(公開)”する操作とは別のステップ。発行には publish_iteration を使う。" },
    { t:`trainer.delete_iteration(project_id, iteration_id)`, c:false, e:"本来これはイテレーションを“削除”するメソッドであり、発行(公開)とは正反対の操作。" }
  ],
  summary:"発行はtrainer.publish_iteration(project_id, iteration_id, publish_name, prediction_resource_id)。学習(train_project)や削除とは別操作。",
  keywords:[
    { k:"Custom Vision の Training と Prediction リソース、Publish、Compact ドメイン", d:"publish_iterationの正しい呼び出し。" }
  ]
},
{
  id:"q187", domain:"nlp", type:"single", mono:true,
  q:"Azure AI Language でテキストの感情分析を実行する正しいコードはどれか。",
  choices:[
    { t:`response = text_analytics_client.analyze_sentiment(documents=["The food was great but service was slow."])`, c:true, e:"Language クライアントの analyze_sentiment メソッドに documents(文字列のリスト)を渡すのが正しい呼び出し方。返り値には文書レベルおよび文レベルの極性が含まれる。" },
    { t:`response = text_analytics_client.get_sentiment("The food was great but service was slow.")`, c:false, e:"本来メソッド名は 'analyze_sentiment' であり 'get_sentiment' というメソッドは存在しない。また引数もリスト形式の documents を期待する。" },
    { t:`response = text_analytics_client.analyze_sentiment("The food was great but service was slow.")`, c:false, e:"本来 analyze_sentiment は documents 引数に“文字列のリスト”を期待する（複数文書をまとめて処理できる設計）。単一の文字列をそのまま渡すのは引数の形式が誤り。" },
    { t:`response = text_analytics_client.sentiment(documents=["The food was great but service was slow."])`, c:false, e:"本来メソッド名は 'analyze_sentiment' というフルネームであり、短縮した 'sentiment' というメソッド名は存在しない。" }
  ],
  summary:"感情分析はanalyze_sentiment(documents=[...])。documentsは文字列のリスト形式で渡す。",
  keywords:[
    { k:"感情分析の階層", d:"analyze_sentimentの正しい呼び出し形式。" }
  ]
},
{
  id:"q188", domain:"genai", type:"single", mono:true,
  q:"Azure OpenAI のチャット応答で、創造性を抑え決定論的な出力を得たい。正しいパラメーター指定はどれか。",
  choices:[
    { t:`response = client.responses.create(model=model_deployment, input=prompt, temperature=0.1)`, c:true, e:"temperature を0に近い低い値に設定することで、モデルは最も確率の高いトークンを選びやすくなり、決定論的で安定した出力が得られる。" },
    { t:`response = client.responses.create(model=model_deployment, input=prompt, temperature=1.8)`, c:false, e:"本来 temperature を高く設定すると出力のランダム性・多様性が増し、創造的だが不安定な応答になりやすい。決定論性を求める本要件とは逆方向の設定。" },
    { t:`response = client.responses.create(model=model_deployment, input=prompt, max_output_tokens=0.1)`, c:false, e:"本来 max_output_tokens は出力の“トークン数上限”を指定する整数パラメーターであり、0.1のような小数や、ランダム性の制御には使わない。パラメーターの用途を取り違えている。" },
    { t:`response = client.responses.create(model=model_deployment, input=prompt, top_p=2.0)`, c:false, e:"本来 top_p は0〜1の範囲で指定する核サンプリングのパラメーター。2.0のような範囲外の値は無効であり、正しい決定論性の制御にもならない。" }
  ],
  summary:"決定論的な出力＝temperatureを低く(0付近に)設定。パラメーター名・値域の取り違えに注意。",
  keywords:[
    { k:"temperature と top_p", d:"正しいパラメーター指定。" }
  ]
},
{
  id:"q189", domain:"genai", type:"multi", source:"AI-103",
  q:"function ツールを使うのが適切なユース ケースを3つ選べ。",
  choices:[
    { t:"社内 API を呼んで、特定顧客の注文状況を取得する", c:true, e:"アプリ独自の内部システム(API)と連携してデータを取得する典型的な function ツールのユース ケース。" },
    { t:"問い合わせ内容に応じてサポート チケットを自動作成するワークフローをトリガーする", c:true, e:"アクションの実行(タスクの自動化)は function ツールの代表的な用途。DBへのレコード作成やワークフロー起動などに使う。" },
    { t:"回答前に自社のビジネス ルール テーブルにクエリを実行して条件を確認する", c:true, e:"データベースへの問い合わせもアプリ独自のロジックであり、function ツールで実装する典型例。" },
    { t:"一般的な歴史上の出来事について説明させる", c:false, e:"本来これはモデルが学習済みの一般知識だけで回答できる質問であり、外部システムとの連携(function)は不要。ツールなしでも十分に答えられる。" },
    { t:"最新の株価をリアルタイムで取得する（自社システムを経由しない一般的な公開情報）", c:false, e:"本来これは web_search（公開情報の検索）が適した領域。自社独自のAPI/DB連携ではないため function ツールの典型ユースケースとしては web_search の方が直接的。" }
  ],
  summary:"functionツールは自社API/DB/ワークフローとの連携に使う。一般知識の質問や公開Web情報の取得には不向き。",
  keywords:[
    { k:"Responses API の組み込みツール4種（code_interpreter / web_search / file_search / function）の使い分け", d:"functionの適切なユースケース。" }
  ]
},
{
  id:"q190", domain:"genai", type:"single", source:"AI-103",
  q:"function calling を実装する際のベスト プラクティスとして正しいものはどれか。",
  choices:[
    { t:"モデルから返された関数の引数を、実行前にアプリ側で検証する", c:true, e:"モデルが生成する引数が常に正しいとは限らないため、実行前に検証（型・範囲・許可された値かなど）するのが実務のベスト プラクティス。特に影響の大きい操作では重要。" },
    { t:"モデルから返された引数は常に正しいとみなし、検証せずそのまま実行する", c:false, e:"本来モデルが返す引数は誤りや予期しない値を含み得る。検証せず実行すると、意図しないデータ操作や誤動作のリスクがあり、セキュリティ上も推奨されない。" },
    { t:"1つの関数にできるだけ多くの機能を詰め込み、汎用化する", c:false, e:"本来ベスト プラクティスは“小さな単一目的の関数”を用意すること。多機能を1つに詰め込むと制御やテストが難しくなり、モデルにとっても呼び出し方の判断が難しくなる。" },
    { t:"影響の大きい操作（決済処理など）も含め、常にモデルの判断だけで即時実行する", c:false, e:"本来影響の大きい操作には明示的な承認フローを設けるべきで、モデルの判断のみで即時実行するのはリスクが高い。ベスト プラクティスとして推奨されない。" }
  ],
  summary:"function callingのベスト プラクティス＝引数の検証・単一目的の小さな関数・影響大な操作は承認フローを設ける。",
  keywords:[
    { k:"Azure OpenAI の function calling 実行フロー（Responses API の実装詳細）", d:"実装時のベストプラクティス。" }
  ]
}

]);
