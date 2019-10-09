import React, { Component } from 'react'
import  { anonymousSignIn } from 'firebase/auth.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  LoginButton
} from './styles'
import WelcomeBack from 'components/WelcomeBack/WelcomeBack'
import logo from 'assets/jstore_logo.svg'

class Header extends Component {
  handleDemo = () => {
    anonymousSignIn((err) => {
      alert('Something went wrong. Contact t.begeyev@jacobs-university.de')
    })
  }

  render() {
    const { isAuth } = this.props
    if (!isAuth) {
      return null
    }
    
    return (
      <HeaderContainer>
        <NavBar>
          <Logo>
            <LogoAnchor>
              <LogoImage src={logo} />
            </LogoAnchor>
          </Logo>
          <MainNavBar>
            {
            isAuth
            ? <WelcomeBack />
            :
            <React.Fragment>
              <MainNavBarElements>
                {/* <MainNavBarElementsLinks onClick={this.handleDemo} to={'/home'}>Anonymous Log in</MainNavBarElementsLinks> */}
                {/* <span style={{marginRight: '20px'}}>or</span> */}
                <MainNavBarElementsLinks to={'/get-started'}>
                  <LoginButton
                    variant="outlined"
                  >
                    Get Started
                  </LoginButton>
                </MainNavBarElementsLinks>
              </MainNavBarElements>
            </React.Fragment>
            }
          </MainNavBar>
        </NavBar>
      </HeaderContainer>
    )
  }
}

export default Header