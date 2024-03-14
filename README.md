# JDON💡

### 개발자 직군별로 최근 채용공고에 많이 언급된 채용 공고와 강의 영상을 추천해주는 플랫폼입니다.

</br>

<img width="647" alt="image" src="https://github.com/Kernel360/f1-JDON-Frontend/assets/103630185/ad371135-d8e5-4493-98f8-588be36fdde1">

## 🔵 주요 서비스 내용

### 기능

- 최근 채용공고에 많이 언급된 직군별 기술스택에 맞는 영상을 추천
- 자유로운 커피챗 모집을 지원

### 타겟

- 취업을 향하여 달려가는 모두
- 자신의 jd 을 분석하여 교육자료 및 회사를 추천받고 싶은 모두
- 같은 고민을 하는, 혹은 배우고 싶은 동료들과의 커피챗을 원하는 모두

### 프로젝트관련 정보

- <a href="https://www.notion.so/JDON-3667f7453ffd40eaa8bcca9b62fbec3a">Notion</a>
- <a href="https://www.figma.com/file/GfE8RImZKlq05g2VfNzqUq/JDON?type=design&node-id=371-1400&mode=design&t=khjS3U9eo9gqCiZT-0">Figma</a>
  </br>

### 배포URL

|  분류   |                          정보                           |
| :-----: | :-----------------------------------------------------: |
| 배포URL | [JDON](https://peaceful-sopapillas-36c089.netlify.app/) |
|  ID/PW  |                       기능구현중                        |

</br>
</br>

## 🔵 FE팀 소개

|                                                                                        **이지원**                                                                                         |                                                                                   **정종미**                                                                                    |                                                              **박준규**                                                               |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| [<img height=150 width=150 alt="image" src="https://github.com/Kernel360/f1-JDON-Frontend/assets/103630185/a93e8ce8-b0e4-4f80-95a6-1abe56f41030"> <br/> @Wlfjd](https://github.com/Wlfjd) | [<img src="https://github.com/Kernel360/f1-JDON-Frontend/assets/116716381/a735504b-6061-4db9-9c44-997c9a257e7a" height=150 width=150> <br/> @jjo-mi](https://github.com/jjo-mi) | [<img src="https://avatars.githubusercontent.com/u/122848687?v=4" height=150 width=150> <br/> @junkue20](https://github.com/junkue20) |
|                                                              전반적인 페이지 디자인 및 퍼블리싱, 회원가입 폼 구현 , api 연동                                                              |                                                    마이페이지 퍼블리싱 및 공통컴포넌트 분리, 회원정보 수정 폼 구현, api 연동                                                    |                     CICD환경 구축 및 배포, JD키워드 전체목록 페이지 퍼블리싱, api 연동 및 전반적인 코드 리팩토링                      |

</br>
</br>

## 🔵 기술스택

|    분류    |                   기술 이름                   |
| :--------: | :-------------------------------------------: |
|    언어    | [JavaScript](https://www.typescriptlang.org/) |
| 프레임워크 |         [React](https://nextjs.org/)          |
|  스타일링  |     [MUI,SCSS](https://tailwindcss.com/)      |
| 라이브러리 |       [Axios,Recoil](https://zod.dev/)        |

</br>
</br>

## 🔵 진행상황

- 피그마를 기준으로 퍼블리싱 끝나고, 현재 각 페이지별 업무를 조정하면서 기능구현하고 있습니다.
- 사용자 편의성을 위해 백엔드팀과 논의하여 디자인 및 기능들 세부 조정중에 있습니다.

### 👉 세부 진행상황

#### 1. 퍼블러싱

> - 피그마를 이용하여 와이어프레임 및 UI/UX 완료
> - mui 를 사용하여 퍼블리싱 90% 완료(페이지: 로그인, 회원가입, 메인, 커피챗, 마이페이지)
> - 반응형으로 구현
>   미미한 스타일 수정은 필요한 상태

#### 2. api 연동

> - 현재 가데이터를 통한 api 연동 중
> - 현재 메인페이지의 인기 기술 스택 부분 완료

</br>
</br>

## 🔵 성능최적화를 위한 노력

1. api 통신을 줄이기 위해 간단한 정보들은 로컬스토리지로 저장하여 데이터 사용
2. 백엔드 팀과 api 설계 과정에서 불필요한 데이터는 받지 않기 위해 활발히 소통
3. 사용자의 편의성을 위해 react-lazyload 적용 예정

</br>
</br>

## 🔵 트러블 슈팅

1. api 요청을 하며 CORS 에러가 발생했습니다. fetch(서버 url) 를 할 때 서버의 "호스트" 주소를 작성하지 않았는데도 불구하고 데이터가 받아와지는 문제가 있었습니다
   원인은 브라우저의 주소와 상대적으로 처리되어, 브라우저의 현재 주소에 기반하여 URL을 조합하기 때문이었이었고 proxy 설정을 통해 이를 우회하고 개발 서버에서 API 요청을 백엔드로 전달하기 때문에 가능했던 것이었습니다

개발 중 편의를 위해 사용되는 proxy 설정은 프론트엔드 개발 서버에서만 적용되며 프로덕션 환경에서는 직접 백엔드 주소를 사용해야 한다는 인사이트를 얻고 .env 파일을 사용해 주소를 저장하였습니다

</br>
</br>

## 🔵 방향성

1. 애자일방식으로 개발 진행, QA를 통한 빠른 피드백 수용
2. 공통 컴포넌트 등 코드의 중복방지와 재사용성 및 통일감 중시
3. 직관적인 UI/UX
4. 필요한 기술스택 최대한 활용

</br>
</br>

## 🔵 구현 목표

- [ ] 기능구현 ~ 1월 31일
- [ ] 리팩토링 ~ 2월 6일
- [ ] 최종마감 2월 7일
      </br>
      </br>

---

## 질문 사항

1. 성능최적화에 대해 고민이 많은데 아직 적용은 못해보고 있어서 시도해볼 수 있는것들에 대해 조언을 받고싶습니다.
2. 공통스타일 및 폴더 구조에 대해 어떤식으로 해나가는게 좋은지 궁금합니다! 현재는 각페이지에서 개별적으로 적용해야하는 스타일들은 scss 파일을 두고 있고, mui의 컴포넌트를 이용해서 할 수 있는 경우는 활용하고 있는데, 자칫 프로젝트를 무겁게 하고 있는게 아닌가라는 생각이들기도하고 실무에서는 어떤식으로 하는지 알고싶습니다.
3. 현업에서의 프론트 팀 협업 방식이 알고싶습니다. 팀 프로젝트를 진행하며 권장하시는 진행 순서(저희 같은 경우는 페이지 디자인을 다 하고 기능을 추가하는 중입니다), 역할 분담(페이지 별, 기능 별 등) 이 무엇인지 궁금합니다.
