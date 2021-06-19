import {
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";
import { useState } from "react";

function Options(props) {
  // abstract these lists to their own file/s
  const languageList = [
    "Bulgarian",
    "Czech",
    "Danish",
    "German",
    "Greek",
    "English",
    "Spanish",
    "Estonian",
    "Finnish",
    "French",
    "Hungarian",
    "Italian",
    "Japan",
    "Lithuanian",
    "Latvian",
    "Maltese",
    "Dutch",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Slovak",
    "Solvene",
    "Swedish",
    "Chinese",
  ];

  const langList = [
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "et",
    "fi",
    "fr",
    "hu",
    "it",
    "ja",
    "lt",
    "lv",
    "mt",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sv",
    "zh",
  ];

  const { deckName, setDeckName, setLanguages, setOptionsOpen } = props;

  const [src, setSrc] = useState(null);
  const [dst, setDst] = useState(null);

  const updateLanguages = () => {
    const chosenLanguages = {
      src: langList[languageList.indexOf(src)],
      dst: langList[languageList.indexOf(dst)],
    };
    setLanguages(chosenLanguages);
    setOptionsOpen(false);
  };

  return (
    <div className="options">
      <TextField
        id="deckName"
        label="Deck name"
        value={deckName}
        onChange={(event) => {
          setDeckName(event.target.value);
        }}
        variant="outlined"
        color="secondary"
      />
      <Typography variant="body2">Translate my cards from:</Typography>
      <Select
        value="Spanish"
        onChange={(event) => {
          setSrc(event.target.value);
        }}
        variant="outlined"
      >
        {languageList.map((language, index) => {
          return (
            <MenuItem key={index} value={language}>
              {language}
            </MenuItem>
          );
        })}
      </Select>
      <Typography variant="body2">To:</Typography>
      <Select
        value="English"
        onChange={(event) => {
          setDst(event.target.value);
        }}
        variant="outlined"
      >
        {languageList.map((language, index) => {
          return (
            <MenuItem key={index} value={language}>
              {language}
            </MenuItem>
          );
        })}
      </Select>
      <div className="button-group">
        <Button
          onClick={updateLanguages}
          variant="contained"
          color="primary"
          size="small"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Options;
