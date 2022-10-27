import styled from "styled-components";

export const Container = styled.div`
    background-color: #3D3F43;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        max-height: 350px;
        max-width: 100%;
        margin-bottom: 10px;
        border-radius: 10px;
        object-fit: cover;
    }
`