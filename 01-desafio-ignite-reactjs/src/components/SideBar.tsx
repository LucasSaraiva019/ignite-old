import { useState } from "react";
import { Button } from "./Button"

interface Genre {
  id: number,
  title: string,
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family",
}
interface GenreProps {
  genre: Genre
  onClickButton: (id: number) => void
  selectedGenreId: number
}

export function SideBar({ genre, onClickButton, selectedGenreId }: GenreProps) {

  function handleClickButton() {
    onClickButton(genre.id)
  }
  return <Button
    key={String(genre.id)}
    title={genre.title}
    iconName={genre.name}
    onClick={handleClickButton}
    selected={selectedGenreId === genre.id}
  />

}