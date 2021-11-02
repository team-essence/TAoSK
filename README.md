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
            ├─ models/
            ├─ utils/
            ├─ env/
            ├─ styles/
```

| ディレクトリ | 役割                           |
| ------------ | ------------------------------ |
| public       | 画像等の静的ファイルを格納する |
| components   | 中身の構成はまだ未定           |
| pages        | 各ページのトップを格納         |
| hooks        | hooks 関数を格納               |
| consts       | 変更が無い値を格納             |
| models       | typescript の型等を格納        |
| utils        | 関数を格納                     |
| env          | env 系をまとめる               |
| styles       | 初期スタイル設定               |

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

## バックエンド

あとでかく
## Makefileの実行一覧
| make                     | description                                  |
| ------------------------ | -------------------------------------------- |
| make start-sql           | Start sql                                    |
| make re-build-sql        | Re build                                     |
| make start-api           | start api (post: 4000)                       |
| make create-class        | Generate a new class                         |
| make create-config       | Generate a CLI configuration file            |
| make create-controller   | Generate a controller declaration            |
| make create-decorator    | Generate a custom decorator                  |
| make create-filter       | Generate a filter declaration                |
| make create-gateway      | Generate a gateway declaration               |
| make create-guard        | Generate a guard declaration                 |
| make create-interceptor  | Generate an interceptor declaration          |
| make create-interface    | Generate an interface                        |
| make create-middleware   | Generate a middleware declaration            |
| make create-model        | Generate a module declaration                |
| make create-pipe         | Generate a pipe declaration                  |
| make create-provider     | Generate a provider declaration              |
| make create-resolver     | Generate a GraphQL resolver declaration      |
| make create-service      | Generate a service declaration               |
| make create-library      | Generate a new library within a monorepo     |
| make create-resource     | Generate a new CRUD resource                 |
| make sql                 | Enter the SQL container                      |

### Makefileで実行する場合引数を渡してあげる(引数名は全て同じ`name`)
```bash
# 例
make create-model name=todos
```
