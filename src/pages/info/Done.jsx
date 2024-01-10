import congrat from "../../assets/images/congrat.svg";

function Done() {
  return (
    <>
      <h2>회원가입이 완료되었습니다!</h2>
      <img src={congrat} alt="축하"></img>
    </>
  );
}

export default Done;
