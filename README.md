# 未来創造展プロジェクト

フォルダ構成やコーディング規約等はここを参照しよう</br>
このプロジェクトの node.js の推奨は v16.0.0</br>
npm は禁止 yarn を使う

## フロントエンド

### 起動方法

`cd frontend`</br>
`yarn`</br>
`yarn start`

### フォルダ構成

```md
frontend/
&ensp;├─ public
&ensp;├─ src/
&ensp;&ensp;├─ index.tsx
&ensp;&ensp;├─ App.tsx
&ensp;&ensp;├─ pages/
&ensp;&ensp;├─ components/
&ensp;&ensp;├─ hooks/
&ensp;&ensp;├─ consts/
&ensp;&ensp;├─ models/
&ensp;&ensp;├─ utils/
&ensp;&ensp;├─ env/
&ensp;&ensp;├─ styles/
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
