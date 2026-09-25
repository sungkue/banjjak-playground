# 반짝 놀이터

6살 아이를 위한 한글·수학·영어 놀이 300문제와 별이 꾸미기 사이트입니다. 과목별 20단계, 단계마다 5문제씩 놀 수 있습니다. 회원 가입은 필요하지 않습니다.

휴대폰에서 바로 열기: [반짝 놀이터](https://sungkue.github.io/banjjak-playground/)

## 실행

Windows에서는 `start-site.cmd`를 실행한 뒤 브라우저에서 [http://localhost:4173/](http://localhost:4173/)을 여세요. 또는 이 폴더에서 터미널을 열고 다음 명령을 실행하세요.

```powershell
python -m http.server 4173
```

서버를 종료하려면 터미널에서 `Ctrl+C`를 누르세요.

별, 끝낸 단계, 옷과 배경 선택은 이 브라우저에 저장됩니다. 음악은 첫 화면 터치 후 시작합니다. 정답을 고르면 박수와 “잘했어!” 음성이 나옵니다. 오른쪽 위 스피커로 음악·음성·효과음을 한꺼번에 끄거나 켤 수 있습니다. 음성, 그림, 글꼴은 사이트에 포함되어 있어 외부 서비스가 필요하지 않습니다.

문제 데이터 확인: `node check.mjs` 또는 `npm run check`

글꼴: Jua, [SIL Open Font License](assets/OFL-Jua.txt).
