import Utils from "../libs/Utils";
import i18n from "../libs/i18n";

function isPromptCloseOrEmptyInput(
  axePupeteetEndPointURL: string,
  response: GoogleAppsScript.Base.PromptResponse,
  ui: GoogleAppsScript.Base.Ui
): boolean {
  return (
    axePupeteetEndPointURL == "" ||
    response.getSelectedButton() == ui.Button.CLOSE
  );
}

export const setURL = (): void => {
  const ui = SpreadsheetApp.getUi();
  let response = ui.prompt(i18n.t("setAxePupeteetEndPointURL"));
  const axePupeteetEndPointURL = response.getResponseText();
  if (isPromptCloseOrEmptyInput(axePupeteetEndPointURL, response, ui)) {
    return;
  }
  if (!Utils.isValidURL(axePupeteetEndPointURL)) {
    ui.alert(i18n.t("noticeUnValidURL"));
    return;
  }
  Utils.setEndPointURL(axePupeteetEndPointURL);

  response = ui.prompt(i18n.t("showTargetUrl"));
  const targetUrl = response.getResponseText();

  if (isPromptCloseOrEmptyInput(targetUrl, response, ui)) {
    return;
  }

  if (!Utils.isValidURL(targetUrl)) {
    ui.alert(i18n.t("noticeUnValidURL"));
    return;
  }
  Utils.setTargetURL(targetUrl);

  response = ui.prompt(i18n.t("showFirebaseFunctionsKey"));
  const functinoKey = response.getResponseText();

  if (isPromptCloseOrEmptyInput(functinoKey, response, ui)) {
    return;
  }
  Utils.setFirebaseFunctionsKey(functinoKey);

  ui.alert(i18n.t("showSetURL"));
};
