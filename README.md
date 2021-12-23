# google-drive-upload-action

This action upload your file to google drive folder

## Usage Example

```yaml
  - uses: ArtemMarchukInmost/google-sheets-action@main
    with:
      GOOGLE_CLIENT_ID: ${{secrets.GOOGLE_CLIENT_ID}}
      GOOGLE_CLIENT_SECRET: ${{secrets.GOOGLE_CLIENT_SECRET}}
      GOOGLE_REFRESH_TOKEN: ${{secrets.GOOGLE_REFRESH_TOKEN}}
      GOOGLE_SHEET_ID: 1HkQhrBlq39nfwh7AYmmKbvlkJm2bqBDbF01pmG5ujUk
      INPUT_FILE: ${{ github.workspace }}/.github/test.json
```

## Inputs

#### GOOGLE_CLIENT_ID

Required

Your Client ID (see [Environment Set Up](#Environment-Set-Up) for more details)

#### GOOGLE_CLIENT_SECRET

Required

Your Client Secret (see [Environment Set Up](#Environment-Set-Up) for more details)

#### GOOGLE_REFRESH_TOKEN

Required

Your Refresh Token (see [Environment Set Up](#Environment-Set-Up) for more details)

#### GOOGLE_SHEET_ID

Required

Your Sheet ID (see [Environment Set Up](#Environment-Set-Up) for more details)

#### INPUT_FILE

Required

Path To Your JSON File with rows (see [Example](https://github.com/ArtemMarchukInmost/google-sheets-action/blob/main/.github/test.json) for more details)

### Environment Set Up

[Notion](https://oil-narcissus-b29.notion.site/Setup-Google-Client-Secret-Client-ID-Refresh-Token-Spread-Sheet-API-73f1b1f0f1b94774ae61694f1877623e)
