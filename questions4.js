/* ===========================================================================
 *  Azure AI-103 模擬問題集 — 追加バッチ4 (AI-103 学習資料: 開発ツール/責任ある AI/
 *  Foundry ポータル演習・エンドポイント3種 由来)
 *  source:"AI-103"。誤答は「本来何か」＋「このケースで不適な理由」を明記。
 *  keyword.k は用語集(glossary.js)の term/alias に一致させ、深い解説をインライン表示。
 * =========================================================================== */
window.AI103_QUESTIONS = (window.AI103_QUESTIONS || []).concat([

{
  id:"q086", domain:"plan", type:"single", source:"AI-103",
  q:"Microsoft Foundry プロジェクトのアセット（モデル・エージェント・接続など）を操作・管理するために使う Web ポータルはどれか。",
  choices:[
    { t:"Microsoft Foundry ポータル", c:true, e:"Foundry ポータルは AI プロジェクトの資産(モデルの検索/デプロイ/テスト、エージェント作成、接続・エンドポイント/キーの確認)を扱う専用の Web インターフェイス。本要件そのもの。" },
    { t:"Azure ポータル", c:false, e:"本来 Azure ポータルは Azure リソース全般(VM/ストレージ/リソース グループ等)を作成・管理する汎用の管理 UI。Foundry リソース自体の管理には使えるが、モデルやエージェントといった“プロジェクト資産の開発操作”を行う場所ではない。" },
    { t:"Microsoft Copilot", c:false, e:"本来 Microsoft Copilot は業務を支援する AI アシスタント。会話で助けてくれるが、Foundry プロジェクト資産を管理する開発ポータルではないため不適。" },
    { t:"Power BI サービス", c:false, e:"本来 Power BI はデータ可視化/BI レポートのサービス。分析ダッシュボード作成が目的で、Foundry の AI 資産操作とは無関係。" }
  ],
  summary:"Foundry プロジェクト資産の操作＝Microsoft Foundry ポータル。Azure ポータルは Azure リソース全般の管理 UI で役割が違う。",
  keywords:[
    { k:"Microsoft Foundry リソース と プロジェクト", d:"Foundry ポータルはプロジェクト資産の開発/管理に使う。" }
  ]
},
{
  id:"q087", domain:"plan", type:"single", source:"AI-103",
  q:"クライアント アプリから、Foundry Agent サービスや、Foundry が直接提供するモデル（OpenAI モデル含む）へ OpenAI Responses API でアクセスしたい。使うべき接続情報はどれか。",
  choices:[
    { t:"プロジェクト エンドポイント", c:true, e:"プロジェクト エンドポイントは、Foundry 直提供モデルへ OpenAI Responses API でアクセスし、かつ Foundry Agent サービスなど“Foundry 固有 API”へアクセスするための入口。エージェント利用や Foundry 固有機能はこれ。" },
    { t:"Azure OpenAI エンドポイント", c:false, e:"本来 Azure OpenAI エンドポイントは OpenAI の API(Chat Completions/Responses)でモデルを呼ぶための入口。モデル呼び出しには使えるが、Foundry Agent サービスなど“Foundry 固有機能”へのアクセス経路ではないため本要件には合わない。" },
    { t:"キー（API キー）", c:false, e:"本来キーは“認証”に使う秘密文字列であって“エンドポイント(接続先)”ではない。どこに接続するかを決めるものではないため、アクセス経路を問う本問の答えにはならない。" },
    { t:"リソース グループ ID", c:false, e:"本来リソース グループ ID は Azure 上でリソースを束ねる管理識別子。API の接続先エンドポイントではないため無関係。" }
  ],
  summary:"Foundry 固有機能(Agent サービス等)＋Responses API＝プロジェクト エンドポイント。OpenAI 構文のモデル呼び出しは Azure OpenAI エンドポイント。キーは“認証”で接続先ではない。",
  keywords:[
    { k:"プロジェクト エンドポイント vs Azure OpenAI エンドポイント", d:"3 接続情報の役割差。" }
  ]
},
{
  id:"q088", domain:"plan", type:"single", source:"AI-103",
  q:"既存の OpenAI SDK を用い、Chat Completions API でモデルにチャットを送るクライアントを実装する。接続先として使うべきものはどれか。",
  choices:[
    { t:"Azure OpenAI エンドポイント", c:true, e:"Azure OpenAI エンドポイントは OpenAI の API(Chat Completions API / Responses API)でモデルを呼ぶための入口。既存の OpenAI SDK/構文をそのまま流用できる本要件に合致。" },
    { t:"プロジェクト エンドポイント", c:false, e:"本来プロジェクト エンドポイントは Foundry 固有 API(Agent サービス等)や Responses API 経由のモデル アクセスに使う入口。Foundry 資産を扱うには適するが、“OpenAI SDK の Chat Completions をそのまま”という本要件では Azure OpenAI エンドポイントが直接的。" },
    { t:"Foundry Tools エンドポイント", c:false, e:"本来 Foundry Tools エンドポイントは Language/Speech/Translator など既製 AI サービスを呼ぶ入口。LLM のチャット入力候補生成には使わないため不適。" },
    { t:"ストレージ アカウントの接続文字列", c:false, e:"本来これは Blob 等の保管領域へアクセスする接続情報。モデルへのチャット呼び出しとは無関係。" }
  ],
  summary:"OpenAI SDK の Chat Completions＝Azure OpenAI エンドポイント。Foundry 固有(エージェント/Responses)＝プロジェクト エンドポイント。",
  keywords:[
    { k:"エンドポイント構成", d:"3 接続情報の送り分け。" }
  ]
},
{
  id:"q089", domain:"plan", type:"single", source:"AI-103",
  q:"本番運用のクライアント アプリから Foundry のモデル/ツールへ接続する。キー ベース認証よりも Microsoft が推奨する認証方式はどれか。",
  choices:[
    { t:"Microsoft Entra ID 認証（認証されたユーザー/アプリ ID に基づく）", c:true, e:"キーは手軽だが漏えいリスクがある。本番では認証済みのユーザー/アプリ ID に基づく Microsoft Entra ID 認証(マネージド ID 等)が推奨で、キー管理そのものを不要にできる。" },
    { t:"キーをソース コードに直接埋め込む", c:false, e:"本来キー認証は動作はするが、コード埋め込みは漏えい・ローテーション困難の温床で最悪の実践。推奨方式ではない。" },
    { t:"匿名アクセスを許可する", c:false, e:"本来 API へ誰でも到達できる状態は、機密やコストの観点で極めて危険。認証を外すのは推奨と真逆。" },
    { t:"共有パスワードを全社で使い回す", c:false, e:"本来共有シークレットの使い回しは監査・失効・最小権限のいずれも損なうアンチパターン。Entra ID の ID ベース認証とは対極。" }
  ],
  summary:"本番の推奨＝Microsoft Entra ID(ID ベース)認証。キーは手軽だが漏えいリスクがあり、埋め込み/匿名/共有は不可。",
  keywords:[
    { k:"キーレス認証", d:"マネージド ID＋RBAC でキー不要。" }
  ]
},
{
  id:"q090", domain:"plan", type:"single", source:"AI-103",
  q:"Foundry ポータルの管理者(Admin)ページでリソース レベルとプロジェクト レベルを確認した。リソース レベルのエンドポイントについて正しい説明はどれか。",
  choices:[
    { t:"リソース内の全プロジェクトで共有される機能（Foundry Tools など）にアクセスするためのもの", c:true, e:"リソース レベルのエンドポイントは、そのリソース配下の全プロジェクトで共有される機能(Foundry Tools 等)へアクセスするための入口。1 リソースは複数プロジェクトを持ち、最初に作ったものが既定プロジェクトになる。" },
    { t:"1 つのプロジェクトに固有の資産だけにアクセスするためのもの", c:false, e:"本来それは“プロジェクト エンドポイント/プロジェクト レベル”の役割。リソース レベルは複数プロジェクト共有の基盤にアクセスするものなので、説明が逆。" },
    { t:"Azure サブスクリプションの課金を管理するためのもの", c:false, e:"本来課金管理は Azure の Cost Management/Billing の領域。Foundry のリソース レベル エンドポイントは AI 機能へのアクセス用であり課金管理用ではない。" },
    { t:"モデルのファインチューニング専用のエンドポイント", c:false, e:"本来ファインチューニングは別のワークフロー/権限で行う。リソース レベル エンドポイントの定義は“共有機能へのアクセス”であって微調整専用ではない。" }
  ],
  summary:"リソース レベル＝全プロジェクト共有の基盤(Foundry Tools 等)へのアクセス。プロジェクト レベル＝個別プロジェクト資産。1 リソース=複数プロジェクト(既定 1 つ)。",
  keywords:[
    { k:"Foundry リソースとプロジェクトの階層", d:"共有インフラ(リソース)と個別の箱(プロジェクト)。" }
  ]
},
{
  id:"q091", domain:"plan", type:"single", source:"AI-103",
  q:"銀行のローン承認を支援する機械学習モデルが、性別や民族などに基づく偏りを含まず全ての申請者を等しく扱うようにしたい。これは責任ある AI のどの原則に直接対応するか。",
  choices:[
    { t:"公平性（Fairness）", c:true, e:"公平性は、性別/民族などのバイアスを排除し全員を公平に扱う原則。ローン承認が特定集団に不利/有利にならないようにするのはまさにこれ。" },
    { t:"包括性（Inclusiveness）", c:false, e:"本来包括性は“能力/性別/民族等に関わらず全員に力を与え、誰も排除しない”原則で、設計/テストに多様なユーザーを参加させる。似ているが、こちらは『排除しない/参加』が主眼で、『不当なバイアスを排除して公平に判定する』本ケースは公平性が直接的。" },
    { t:"透明性（Transparency）", c:false, e:"本来透明性は目的/仕組み/限界/信頼度スコアをユーザーが理解できるようにする原則。偏りの有無を判定基準にする本ケースの主題ではない。" },
    { t:"説明責任（Accountability）", c:false, e:"本来説明責任は人間が最終責任を負いガバナンス内で開発する原則。重要だが、判定の偏り排除そのものを指す原則ではない。" }
  ],
  summary:"バイアスを排し全員を公平に扱う＝公平性。『誰も排除せず力を与える』の包括性との違いに注意。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"公平性 vs 包括性の混同に注意。" }
  ]
},
{
  id:"q092", domain:"plan", type:"single", source:"AI-103",
  q:"自律走行車や、患者の症状を診断し処方を推奨するモデルは、リリース前の厳格なテストと、確率的予測の信頼度しきい値の適切な適用が求められる。これは責任ある AI のどの原則か。",
  choices:[
    { t:"信頼性と安全性（Reliability & Safety）", c:true, e:"信頼性と安全性は、想定条件下で確実・安全に動くことを求める原則。厳格なテスト/デプロイ管理と、確率的モデルの信頼度スコアに対する適切なしきい値適用が該当する。人命に関わる用途で特に重要。" },
    { t:"説明責任（Accountability）", c:false, e:"本来説明責任は“人間が最終責任を負い、ガバナンス フレームワーク内で開発する”原則。組織的責任の話であり、テストやしきい値で“確実・安全に動かす”こと自体を指す原則ではない。" },
    { t:"プライバシーとセキュリティ（Privacy & Security）", c:false, e:"本来これは学習/推論で扱う個人データを保護する原則。安全な“動作の信頼性”とは別軸で、本ケースの主題ではない。" },
    { t:"公平性（Fairness）", c:false, e:"本来公平性はバイアス排除の原則。テスト/信頼度しきい値による“確実な安全動作”とは焦点が異なる。" }
  ],
  summary:"厳格テスト＋信頼度しきい値で確実・安全に動かす＝信頼性と安全性。人間の責任/ガバナンスの説明責任とは別。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"信頼性と安全性 vs 説明責任の違い。" }
  ]
},
{
  id:"q093", domain:"plan", type:"single", source:"AI-103",
  q:"ユーザーが AI システムの目的・動作方法・想定される制限事項を十分に認識でき、予測の信頼度スコアも共有される必要がある。これは責任ある AI のどの原則か。",
  choices:[
    { t:"透明性（Transparency）", c:true, e:"透明性は、システムの目的/仕組み/限界/信頼度スコアをユーザーが理解できるようにする原則。制限事項の周知や信頼度の開示はこれに該当する。" },
    { t:"プライバシーとセキュリティ（Privacy & Security）", c:false, e:"本来これは扱う個人データを保護し安全に保つ原則。データの守り方であって、仕組みや限界を“理解できるように開示する”透明性とは別。" },
    { t:"公平性（Fairness）", c:false, e:"本来公平性はバイアスを排して公平に扱う原則。予測の仕組み/限界の“開示”を主眼とする本ケースとは焦点が異なる。" },
    { t:"包括性（Inclusiveness）", c:false, e:"本来包括性は誰も排除せず全員に力を与える原則。理解可能性(透明性)とは別の観点。" }
  ],
  summary:"目的/仕組み/限界/信頼度スコアを理解できるよう開示＝透明性。データ保護のプライバシーとは別物。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"透明性(理解できる) vs プライバシー(データを守る)。" }
  ]
},
{
  id:"q094", domain:"plan", type:"single", source:"AI-103",
  q:"AI システムが自律的に動くように見えても、モデルを学習/検証し、予測に基づく意思決定ロジックを定義した“人間”が最終的な責任を負い、ガバナンスの枠組み内で開発すべきである。これは責任ある AI のどの原則か。",
  choices:[
    { t:"説明責任（Accountability）", c:true, e:"説明責任は、人がAIシステムに責任を負い、ガバナンスと組織原則のフレームワーク内で、法的/倫理的標準を満たすように開発する原則。まさに本文の内容。" },
    { t:"信頼性と安全性（Reliability & Safety）", c:false, e:"本来これは“確実・安全に動作させる”原則(テスト/しきい値)。動作品質の話であって、“人間が責任を負いガバナンス下で開発する”という統制の主題ではない。" },
    { t:"透明性（Transparency）", c:false, e:"本来透明性は仕組み/限界の開示。責任の所在やガバナンスを定める本ケースとは焦点が異なる。" },
    { t:"公平性（Fairness）", c:false, e:"本来公平性はバイアス排除。責任・ガバナンスの原則ではない。" }
  ],
  summary:"人間が責任を負いガバナンス下で開発＝説明責任。確実・安全に“動かす”信頼性と安全性とは別。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"説明責任(責任/ガバナンス) vs 信頼性と安全性(動作品質)。" }
  ]
},
{
  id:"q095", domain:"plan", type:"single", source:"AI-103",
  q:"アプリの設計・開発・テストにできるだけ多様なユーザー グループの入力を取り入れ、身体能力・性別・民族などに関係なく社会のあらゆる部分に利益をもたらすようにしたい。これは責任ある AI のどの原則か。",
  choices:[
    { t:"包括性（Inclusiveness）", c:true, e:"包括性は、能力/性別/民族等に関わらず全員に力を与え、誰も排除しない原則。多様なユーザーを設計/テストに参加させて最適化するのが該当する。" },
    { t:"公平性（Fairness）", c:false, e:"本来公平性は“判定に不当なバイアスを入れない”原則。似ているが、こちらは判定の偏り排除が主眼で、『多様な人を巻き込み全員に力を与える』という参加/包摂の観点は包括性が直接的。" },
    { t:"透明性（Transparency）", c:false, e:"本来透明性は仕組み/限界の開示。多様性の包摂とは別の観点。" },
    { t:"プライバシーとセキュリティ（Privacy & Security）", c:false, e:"本来これはデータ保護の原則で、包摂性とは無関係。" }
  ],
  summary:"多様な人を巻き込み全員に力を与える＝包括性。判定のバイアス排除は公平性——この 2 つの混同が頻出。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"包括性(誰も排除しない) vs 公平性(バイアスを入れない)。" }
  ]
},
{
  id:"q096", domain:"plan", type:"single", source:"AI-103",
  q:"モデルの学習に使う大量のデータや、運用後に予測で扱う新しいデータには個人情報が含まれ得る。これらのデータと顧客コンテンツを保護する適切なセーフガードを実装すべきである。これは責任ある AI のどの原則か。",
  choices:[
    { t:"プライバシーとセキュリティ（Privacy & Security）", c:true, e:"この原則は、学習/推論で扱うデータの機密を守り、システムを安全に保つことを求める。個人情報や顧客コンテンツの保護セーフガード実装はまさにこれ。" },
    { t:"透明性（Transparency）", c:false, e:"本来透明性は仕組み/限界/信頼度の“開示”。データの使い方を明確にする面はあるが、データ自体を“保護する”本ケースの主題はプライバシーとセキュリティ。" },
    { t:"公平性（Fairness）", c:false, e:"本来公平性はバイアス排除。データ保護とは別軸で、本ケースの答えにはならない。" },
    { t:"信頼性と安全性（Reliability & Safety）", c:false, e:"本来これは確実・安全な“動作”の原則。データ機密の保護そのものはプライバシーとセキュリティが担う。" }
  ],
  summary:"個人情報/顧客データの保護セーフガード＝プライバシーとセキュリティ。開示の透明性とは別。",
  keywords:[
    { k:"Responsible AI 6 原則", d:"プライバシー(守る) vs 透明性(開示する)。" }
  ]
},
{
  id:"q097", domain:"plan", type:"single", source:"AI-103",
  q:"開発者が Visual Studio Code を離れずに Foundry プロジェクトのリソース参照・モデルのデプロイ・プレイグラウンドでのテストを行いたい。導入すべきものはどれか。",
  choices:[
    { t:"Foundry Toolkit for VS Code 拡張機能", c:true, e:"Foundry Toolkit はプロジェクト リソースの参照/管理、モデル カタログからのデプロイ、統合プレイグラウンドでのテスト、宣言型/ホスト型エージェント構成(デザイナー＋YAML)、統合コード生成を VS Code 内で行える拡張。本要件に直接対応。" },
    { t:"Visual Studio Code の Python 拡張機能", c:false, e:"本来 Python 拡張は Python の編集/デバッグ/実行を支援するもの。言語支援であって、Foundry プロジェクト資産を扱う機能は提供しないため本要件に合わない。" },
    { t:"GitHub Copilot", c:false, e:"本来 Copilot はコード補完/生成を助ける AI ペア プログラマー。生産性は上がるが、Foundry プロジェクト資産の参照/デプロイ/テストを行う拡張ではない。" },
    { t:"Azure CLI", c:false, e:"本来 Azure CLI はコマンドラインで Azure リソースを操作するツール。自動化には有用だが、VS Code 内でモデルをプレイグラウンドで対話テストする本要件の手段ではない。" }
  ],
  summary:"VS Code で Foundry 資産を扱う＝Foundry Toolkit 拡張。Python 拡張は言語支援、Copilot はコーディング補助で役割が違う。",
  keywords:[
    { k:"Foundry Toolkit for VS Code", d:"VS Code で Foundry 資産を扱う拡張。" }
  ]
},
{
  id:"q098", domain:"plan", type:"single", source:"AI-103",
  q:"生成 AI エージェントだけに頼らず、テキスト分析・音声・翻訳・コンテンツ理解などの一般タスクに“すぐ使える事前構築済みサービス”を活用したい。該当する Microsoft Foundry のコンポーネントはどれか。",
  choices:[
    { t:"Foundry Tools", c:true, e:"Foundry Tools は Language/Speech/Translator/Document Intelligence/Content Understanding など、一般 AI タスク向けの事前構築済み API/モデルのセット。生成 AI だけに頼るよりコスト効率が高く予測可能。" },
    { t:"Foundry Models", c:false, e:"本来 Foundry Models は Microsoft/OpenAI/他社の“モデル カタログ”。LLM 等のモデルを選んでデプロイする場所であって、一般タスク向けの“既製サービス”そのものではない。" },
    { t:"Foundry IQ", c:false, e:"本来 Foundry IQ は複数ナレッジ ソースを 1 つの中央 MCP 接続に束ねる“ナレッジ接続”機能。テキスト分析や翻訳などの既製 AI サービス群ではない。" },
    { t:"Foundry Agent サービス", c:false, e:"本来 Agent サービスはエージェント(命令＋ツール)の開発/実行基盤。個別 AI タスクの既製 API 群ではないため、本ケースの“事前構築済みサービス”には当たらない。" }
  ],
  summary:"一般タスクの既製 API/モデル＝Foundry Tools。カタログ＝Foundry Models、ナレッジ集約＝Foundry IQ、エージェント基盤＝Agent サービス。",
  keywords:[
    { k:"Foundry Tools", d:"Language/Speech/Translator/Doc Intelligence/Content Understanding など既製 AI サービス群。生成 AI だけに頼るよりコスト効率が高く予測可能で、Foundry リソース上でホストされ、ツール固有エンドポイント＋プロジェクト認証キー/トークンで使う。Foundry Models(モデル カタログ)や Foundry IQ(ナレッジ接続)、Agent サービス(エージェント基盤)とは役割が異なる。" }
  ]
},
{
  id:"q099", domain:"plan", type:"single", source:"AI-103",
  q:"Foundry ポータルでモデル(例: gpt-4.1)をデプロイした直後、そのモデルに指示やクエリを与えて対話的に動作を試せる場所はどれか。",
  choices:[
    { t:"モデル プレイグラウンド（model playground）", c:true, e:"モデルをデプロイすると自動的にモデル プレイグラウンドが開き、system 指示やチャット クエリを入力して応答を対話的にテストできる。VS Code の Foundry Toolkit でも同様のプレイグラウンドを開ける。" },
    { t:"Azure Monitor のメトリック エクスプローラー", c:false, e:"本来 Azure Monitor はメトリック/ログの監視ツール。稼働状況の可視化には使うが、モデルへ指示を送って応答を対話テストする場所ではない。" },
    { t:"リソース グループの概要ブレード", c:false, e:"本来これは Azure リソースの一覧/管理画面。モデルの対話テスト機能は持たない。" },
    { t:"Key Vault のシークレット画面", c:false, e:"本来 Key Vault はキー/シークレットの保管庫。モデルのテストとは無関係。" }
  ],
  summary:"デプロイ済みモデルの対話テスト＝モデル プレイグラウンド(ポータル/Foundry Toolkit)。監視の Azure Monitor とは別。",
  keywords:[
    { k:"Foundry Toolkit for VS Code", d:"統合プレイグラウンドで VS Code 内からモデル/エージェントをテストできる。" }
  ]
}

]);
