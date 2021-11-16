# 未来創造展プロジェクト

フォルダ構成やコーディング規約等はここを参照しよう</br>
このプロジェクトの node.js の推奨は v16.0.0</br>
npm は禁止 yarn を使う

## 初期インストール

`make init`

## フロントエンド

### 起動方法

`make start-front`

### フォルダ構成

```bash
frontend/
      ├─ public
      ├─ src/
            ├─ index.tsx
            ├─ App.tsx
            ├─ pages/
            ├─ components/
            ├─ hooks/
            ├─ consts/
            ├─ utils/
            ├─ env/
            ├─ styles/
```

| ディレクトリ | 役割                   |
| ------------ | ---------------------- |
| components   | 中身の構成はまだ未定   |
| pages        | 各ページのトップを格納 |
| hooks        | hooks 関数を格納       |
| consts       | 変更が無い値を格納     |
| utils        | 関数を格納             |
| env          | env 系をまとめる       |
| styles       | 初期スタイル設定       |

### コード規約

#### ファイル名・クラス名・変数・関数名とかの命名

[codic](https://codic.jp/engine)を使う

#### ファイル名・クラス名

拡張子が tsx のコンポーネントファイルに関してはアッパーキャメルを使う

```js
// 例
UserData.tsx, PostForm.tsx;
class User extends React.Component {}
const App: FC = () => {};
```

それ以外の通常の ts ファイルなどに関してはローワーキャメルを使う

```js
// 例
multipleIncludes.ts, formatDate.ts,
```

#### 変数・関数名

ローワーキャメルを使う

```js
// 例
const userData = "hoge";
const createUser = () => {};
const [state, setState] = useState("");
```

#### コンポーネントの呼び出しと書き出し

基本的に default export は禁止、export を利用する

```js
// 例
import { Button } from "components/Button";

export const Hoge = () => {
  // 処理
};
```

#### styled-components の使用

- 記述する際はコンポーネントの 1 番下に置く
- 通常のコンポーネントと勘違いが起きないように、接頭辞に「Styled」を付ける

```js
// 例
import { Button } from "components/Button";

export const Hoge = () => {
  return (
    <StyledContainer>
      <p>hoge</p>
      <Button />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: "#fff";
`;
```

#### gql の型を自動生成

1. Playground でクレリーを確認する
2. gql ファイルを発火したいページのフォルダ内に作る
3. `make generate-gql` or `cd frontend && yarn generate-gql`を発火
4. ファイル名はわかりやすく
   (_api コンテナを起動していること_)

## バックエンド

### 起動方法

#### 初回起動時

`cd api`

`docker-compose up --build`

docker の初期 DB 作成がうまく動かないので下記で DB 作成

`docker ps`(一覧が出るので mySQL のコンテナ ID を取得)

`docker exec -it [コンテナID] bash`

`mysql -u root -p`(password は[password])

`CREATE DATABASE IF NOT EXISTS taosk_db`

#### 大変だったら ↓ で(個人に任せる)

`make init-database`

#### 2 回以降は下記

`docker-compose up`
(開発者は基本的に docker を up したり down したりすることが多くなる想定なので makefile 化はしない)

### GQL を試す

下記で playground が起動する
`http://localhost:3700/graphql`

### docker 内の mysql に入る方法

該当するコンテナ ID を探す
`docker ps`

コンテナに入る
`docker exec -it [コンテナID] bash`

コンテナに入る パスワードは password
`mysql -u develop -p`

### 開発に必要なこと

モジュール作成(モジュールとは説明難しい　大本的なやつ)

```
  nest generate module [複数形モジュール名]
  例 nest generate module books
```

モデル作成(モデルは DB 構造的なやつ)

````
  nest generate class [複数形モデル名]/[単数系モデル名]
  例 nest generate class books/book
```

リゾルーバ作成(GQLでの操作queryやmutationをの記載を行う)
````

nest generate resolver [複数形モデル名]
例 nest generate resolver books
spec が同時にできてしまうので消す、できないコマンドあるかも

```

サービス作成(ビジネスロジックを書く DBへの追加とかの処理を書く)
```

nest generate service [複数形モデル名]
例 nest generate service books
spec が同時にできてしまうので消す、できないコマンドあるかも

makefile のコマンドでも作れる

## Makefile の実行一覧

````

| make                    | description                              |
| ----------------------- | ---------------------------------------- |
| make start-api          | Start api                                |
| make down-api           | Down api                                 |
| make re-build-api       | Re build                                 |
| make ps                 | Container list                           |
| make sql                | Enter the SQL container                  |
| make create-class       | Generate a new class                     |
| make create-config      | Generate a CLI configuration file        |
| make create-controller  | Generate a controller declaration        |
| make create-decorator   | Generate a custom decorator              |
| make create-filter      | Generate a filter declaration            |
| make create-gateway     | Generate a gateway declaration           |
| make create-guard       | Generate a guard declaration             |
| make create-interceptor | Generate an interceptor declaration      |
| make create-interface   | Generate an interface                    |
| make create-middleware  | Generate a middleware declaration        |
| make create-model       | Generate a module declaration            |
| make create-pipe        | Generate a pipe declaration              |
| make create-provider    | Generate a provider declaration          |
| make create-resolver    | Generate a GraphQL resolver declaration  |
| make create-service     | Generate a service declaration           |
| make create-library     | Generate a new library within a monorepo |
| make create-resource    | Generate a new CRUD resource             |

### Makefile で実行する場合引数を渡してあげる(引数名は全て同じ`name`)

```bash
# 例
make create-model name=todos
````
