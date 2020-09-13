import styled from 'styled-components'

const TextLoader = styled.span`
    width:  ${props => props.width};
    height: ${props => props.height};
    position: absolute;
    border-radius: 10px;
    animation: aniVertical 3s ease;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    background-color: var(--gris-claro);
    opacity: 0.65; 
    @keyframes aniVertical {
        0% {
            opacity: 0.65;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.65;
        }
    }    
`

export default TextLoader