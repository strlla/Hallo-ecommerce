import styled from 'styled-components';

const ItemLoader = styled.div`
    background: linear-gradient(125.75deg, var(--gris-claro) ,var(--blanco) 33%, var(--gris-claro) 66%,var(--blanco) 138%);
    background-size: 200% 200%;
    animation-name: loading-animate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-timing-function: linear;
    margin: auto;
    height:  ${props => props.height};
    width:  ${props => props.width};
    border-radius: ${props => props.borderRadius};
    
    @keyframes loading-animate {
            from {
            background-position-x: 0;
            }
            to {
            background-position-x: 200%;
            }
        }
    }
`
export default ItemLoader