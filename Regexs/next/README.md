# 次世代プロダクト：給与労務

## Project Home

http://ysv-ddtrac04/trac/nextgen/

## Getting Started

### インストール

```
npm install
```

### アプリ実行

```
npm run dev
```

### Git コミットテンプレートを設定

```
git config commit.template .gitmessage
```

config を設定してから`git commit`実行する。
template をもとにして commit message を作成する。

### Git 改行の設定を変更する

```
git config --global core.autoCRLF false
```

※リポジトリのファイルをそのままチェックアウトして、プッシュ時も改行文字を変更しない設定になる

### VSCode の改行文字を LF にする

「ファイル」>「基本設定」>「設定」>"end of line"で検索して改行文字を lf に変更する

### VSCode の拡張機能おすすめ

下記のうち、ESLint、Prettier、EditorConfig は必須

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

## Running the test

```
npm test
```
