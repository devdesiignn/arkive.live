function pageTitle(title: string): void {
  document.title = `${title} - ${document.title}`;
}

export default pageTitle;
