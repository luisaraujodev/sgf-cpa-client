interface IAutoComplete {
  create(): void,
}

export default class AutoComplete implements IAutoComplete {
  private autoComplete: HTMLInputElement;
  private data: string[];
  private containerAutoComplete = document.createElement("div");
  private uiData: HTMLElement = document.createElement("ul");
  private listSelected = -1;
  private cacherLastValue = "";

  private cssStyle = `
  .autocomplete-container {    
    position: relative;
  }
  
  .autocomplete-container > .autocomplete-list{
    display: flex;
    flex-direction: column;
    position: absolute;
    width: auto;
    height: auto;
    padding:0;
    margin:0;
    font-size: 0.75rem;
    margin-right: 100%;
    font-weight: 400;
    line-height: 1.5;
    outline: none;
    background-color: var(--th-background);
    border: 1px solid;
    border-color: var(--th-border);
    border-radius: 4px;
    box-shadow: 0px 0px 5px rgb(26, 141, 95, 0);
    overflow: auto;
    z-index: 1;
    transition: all 0.2s ease;
  }

  .autocomplete-container > .autocomplete-list > li{
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  z-index: 2;
 }

 .autocomplete-container > .autocomplete-list > li[selected] a{
  color: var(--green);
  background-color: var(--hover-green);
 }
 
 .autocomplete-container > .autocomplete-list > li a{
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--th-text-df);
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: auto;
  padding: 4px 10px 4px 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.75rem;
  position: relative;
  transition: color 0.2s, background-color 0.2s;
 }

 .autocomplete-container > .autocomplete-list > li a span{
  opacity: 0.65;
 }

 .autocomplete-container > .autocomplete-list > li:hover a{
    color: var(--white);
    background-color: #1a8d5f;
  }

  .autocomplete-container > .autocomplete-list > li:hover a span {
    opacity: 1;
  }
  `
  constructor(component: HTMLInputElement, data: string[]) {
    this.autoComplete = component;
    this.data = data;

    this.autoComplete.parentElement?.appendChild(this.containerAutoComplete)

    this.containerAutoComplete.appendChild(this.autoComplete)
    this.containerAutoComplete.className = "autocomplete-container";
    this.containerAutoComplete.style.width = "-webkit-fill-available";
  }

  private navegateAutoComplete(e: KeyboardEvent): void {
    const isOpen = this.uiData.getAttribute("open");

    if ((e.key == "ArrowUp" || e.key == "ArrowDown") && isOpen) {
      e.preventDefault()
      const list_li = this.uiData.querySelectorAll("li");
      if (list_li.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            const next = list_li.length - 1 > this.listSelected ? this.listSelected + 1 : list_li.length - 1;
            this.selectData(list_li[next], false)
            break;
          case "ArrowUp":
            const befolt = 1 < this.listSelected ? this.listSelected - 1 : 0;
            this.selectData(list_li[befolt], false)
            break;
        }
      }
    }

    if ((e.key == "Tab") && isOpen) {
      console.log('dd')
      e.preventDefault()
      const list_li = this.uiData.querySelectorAll("li");
      const next = this.listSelected < 0 ? 0 : this.listSelected
      this.selectData(list_li[next], true)
      this.closeAutoComplete()
    }

    if (e.key == "Enter") {
      this.closeAutoComplete()
    }
  }

  private closeAutoComplete = () => {
    setTimeout(() => {
      this.uiData.style.display = "none"
      this.uiData.removeAttribute("open");
    }, 100)
  }

  private selectData(item: HTMLLIElement, setValue: boolean): void {
    this.uiData.querySelector("[selected]")?.removeAttribute("selected")

    item.setAttribute("selected", 'true')

    this.listSelected = Number(item.getAttribute('n'));

    if (setValue) {
      this.autoComplete.value = String(item.textContent);
      this.cacherLastValue = String(item.textContent);
    }
  }

  private filterAutoComplete(): void {

    if (this.cacherLastValue.toUpperCase() != this.autoComplete.value.toUpperCase()) {
      this.uiData.setAttribute("open", "true");

      this.cacherLastValue = this.autoComplete.value.toUpperCase();
      const filterValue = this.autoComplete.value.toUpperCase();
      const sptfilterValue = filterValue.split(" ");
      const lastValue = sptfilterValue[sptfilterValue.length - 1];

      if (lastValue.trim().length > 1) {
        let newData: string[] = [];
        let contExist = 0;
        newData = this.data.filter(i => {
          //limit data
          if (contExist > 4) return false

          const fistChar = String(i).toUpperCase()[0] == lastValue.trim()[0];

          if (!fistChar) return false

          const isExist = String(i).toUpperCase().includes(lastValue.trim());

          if (isExist) contExist++;

          return isExist
        });

        if (newData.length > 0) {
          sptfilterValue.splice(sptfilterValue.length - 1, 1);
          this.createData(newData, JSON.stringify(sptfilterValue).replace(/[\[\]"']/gi, '').replace(/[,]/gi, " "))
        } else {
          this.closeAutoComplete()
        }
      } else {
        this.closeAutoComplete()
      }
    }


  }

  private createData(newData: string[], complementValue: string): void {
    const inputContainer = this.autoComplete;

    const inputOffsets = inputContainer.getBoundingClientRect()
    const inputTop = inputOffsets.height + 5;

    this.uiData.innerHTML = "";

    this.uiData.innerHTML = this.uiData.innerHTML + `<style>${this.cssStyle}<style/>`
    this.uiData.className = "autocomplete-list";
    this.uiData.setAttribute("style", `
    top: ${inputTop}px;    
    min-width: 100%;`)

    newData.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = "autoCompleteItem";

      const a = document.createElement("a");
      const nameText = `${complementValue ? complementValue + " " + item : item}`;
      a.title = nameText;
      a.textContent = nameText;

      li.appendChild(a)
      li.setAttribute('n', String(idx))
      li.addEventListener("click", () => { this.selectData(li, true); })

      this.uiData.appendChild(li)
    });

    this.containerAutoComplete?.appendChild(this.uiData)
  }

  private startCreate(): void {
    this.filterAutoComplete();
  }

  create(): void {
    this.autoComplete.addEventListener("keyup", () => { this.startCreate() })
    this.autoComplete.addEventListener("keydown", (e) => { this.navegateAutoComplete(e); })

    this.autoComplete.addEventListener("blur", () => { this.closeAutoComplete() })
  }

}