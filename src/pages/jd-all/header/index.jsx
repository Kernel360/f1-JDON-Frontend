import React from 'react'
import JDSearchBar from './JDSearchBar'
import CommonHeader from "../../../components/common/Header";

function Header() {
  return (
    <>
      <CommonHeader title={'메인 페이지'}/>
      <JDSearchBar />
    </>
  )
}

export default Header
