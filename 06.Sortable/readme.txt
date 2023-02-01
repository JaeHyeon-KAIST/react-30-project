1. 패키지 설치
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm i react react-dom
----------
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin copy-webpack-plugin core-js cross-env html-webpack-plugin terser-webpack-plugin webpack webpack-cli webpack-dev-server @pmmmwh/react-refresh-webpack-plugin mini-css-extract-plugin css-loader style-loader file-loader
----------

2. 개발용 서버 구동
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm run dev
----------

3. 빌드(배포용 파일 생성)
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm run build
----------

(!)
npm start 또는 npm run build 실행 시 에러가 난다면 Node.js를 LTS 버전(장기 지원 버전)으로 설치 후 다시 시도해 보세요.
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르면 설치할 수 있어요.
----------
n lts
----------

(!)
ERROR in unable to locate '경로...'
위와 같은 에러가 발생한다면, webpack.config.js의 CopyWebpackPlugin에 설정된 파일이 있는지 확인해주세요.
CSS나 이미지 폴더 등이 필요하지 않다면 webpack.config.js에서 CopyWebpackPlugin 부분 전체를 주석 처리 해주세요.
----------
CopyWebpackPlugin: 그대로 복사할 파일들을 설정하는 플러그인 아래 patterns에 설정한 파일/폴더는 빌드 시 dist 폴더에 자동으로 생성됩니다.
patterns에 설정한 경로에 해당 파일이 없으면 에러가 발생합니다.