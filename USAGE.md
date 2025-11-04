# wish_do プロジェクト 使い方ガイド

## プロジェクト概要

このプロジェクトは Next.js 16.0.1 と React 19.2.0 を使用したモダンなWebアプリケーションです。

### 主な技術スタック

- **フレームワーク**: Next.js 16.0.1 (App Router)
- **UIライブラリ**: React 19.2.0
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **最適化**: React Compiler (babel-plugin-react-compiler)
- **フォント**: Geist Sans & Geist Mono

## セットアップ

### 必要な環境

- Node.js 20以上
- npm

### 依存関係のインストール

```bash
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

ファイルを編集すると、ページが自動的に更新されます。

### 主要なコマンド

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm run start

# ESLintによるコードチェック
npm run lint
```

## プロジェクト構造

```
wish_do/
├── src/
│   └── app/                 # App Router のページとレイアウト
│       ├── layout.tsx       # ルートレイアウト
│       ├── page.tsx         # ホームページ
│       ├── globals.css      # グローバルスタイル
│       └── favicon.ico      # ファビコン
├── public/                  # 静的ファイル
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
├── node_modules/            # 依存パッケージ
├── .next/                   # ビルド出力（自動生成）
├── package.json             # プロジェクト設定と依存関係
├── tsconfig.json            # TypeScript 設定
├── next.config.ts           # Next.js 設定
├── postcss.config.mjs       # PostCSS 設定
├── eslint.config.mjs        # ESLint 設定
└── .gitignore               # Git 除外設定
```

## ファイル・ディレクトリの説明

### `src/app/`

App Router のファイルを配置するディレクトリです。

- **`layout.tsx`**: 全ページ共通のレイアウトコンポーネント
  - メタデータの設定
  - フォントの読み込み
  - HTML構造の定義

- **`page.tsx`**: ホームページのコンポーネント
  - `/` ルートでアクセスされるページ

- **`globals.css`**: Tailwind CSS のディレクティブとグローバルスタイル

### `public/`

静的ファイルを配置するディレクトリです。このディレクトリのファイルは `/` からアクセスできます。

例: `public/next.svg` → `http://localhost:3000/next.svg`

### 設定ファイル

- **`tsconfig.json`**: TypeScript のコンパイラ設定
  - パスエイリアス: `@/*` → `./src/*`
  - 厳格な型チェック有効

- **`next.config.ts`**: Next.js の設定

- **`package.json`**:
  - プロジェクト情報
  - 依存パッケージ
  - npm スクリプト

## 開発のヒント

### 新しいページの追加

App Router では、`src/app/` 内にディレクトリを作成してページを追加します。

```
src/app/about/page.tsx  → http://localhost:3000/about
src/app/blog/page.tsx   → http://localhost:3000/blog
```

### パスエイリアスの使用

`@/` を使って `src/` からの相対パスでインポートできます。

```typescript
// 良い例
import { Component } from '@/components/Component'

// 避けるべき例
import { Component } from '../../components/Component'
```

### スタイリング

Tailwind CSS を使用しています。クラス名でスタイルを適用できます。

```tsx
<div className="flex items-center justify-center">
  コンテンツ
</div>
```

### 画像の最適化

Next.js の `Image` コンポーネントを使用して画像を最適化できます。

```tsx
import Image from "next/image"

<Image
  src="/image.png"
  alt="説明"
  width={500}
  height={300}
/>
```

## TypeScript

このプロジェクトは TypeScript で書かれています。

- 厳格な型チェックが有効
- `next-env.d.ts` で Next.js の型定義が自動生成される
- 型エラーはビルド時に検出される

## デプロイ

### Vercel でのデプロイ（推奨）

1. [Vercel](https://vercel.com) にサインアップ
2. プロジェクトを Git リポジトリにプッシュ
3. Vercel で新しいプロジェクトをインポート
4. 自動的にデプロイされます

### その他のプラットフォーム

```bash
# ビルド
npm run build

# サーバー起動
npm run start
```

ビルド成果物は `.next` ディレクトリに生成されます。

## トラブルシューティング

### ポートが既に使用されている

デフォルトのポート 3000 が使用されている場合：

```bash
PORT=3001 npm run dev
```

### キャッシュのクリア

問題が発生した場合、キャッシュをクリアしてみてください：

```bash
rm -rf .next
npm run dev
```

### 依存関係の再インストール

```bash
rm -rf node_modules package-lock.json
npm install
```

## リソース

- [Next.js ドキュメント](https://nextjs.org/docs)
- [React ドキュメント](https://react.dev)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs)

## ライセンス

プライベートプロジェクト
