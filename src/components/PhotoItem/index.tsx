import React from 'react'
import * as C from './styles';

type PhotoItemProps = {
    name: string,
    url: string
}

export function PhotoItem({ name, url }: PhotoItemProps) {
    return (
        <C.Container>
            <img src={url} alt={name} />
            {name}
        </C.Container>
    )
}
