import { useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface SelectHeaderIndicator {
    selected: number;
}

export function Header(props: SelectHeaderIndicator) {
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps>(`genres/${props.selected}`).then(response => {
            setSelectedGenre(response.data);
        });
    }, [props.selected]);
    return (
        <header>
            <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
    )

}