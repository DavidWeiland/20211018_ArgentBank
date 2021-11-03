import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
    padding: 30px;
    border: 6px solid #42b983;
    border-bottom-color: transparent;
    border-radius: 100px;
    animation: ${rotate} 1s infinite linear;
    height: 0;
    width: 0;
    margin : auto;
    margin-top:4rem
`