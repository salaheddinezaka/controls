import { toggleMobileModal } from ".";
import { getStates } from "./getStates";



export function insertMobileModalButton() {
  const modalButton = document.createElement("button");
  modalButton.id = "mobile-filters";
  modalButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:v="https://vecta.io/nano" viewBox="0 0 477.867 477.867"><path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z"/></svg>
<span>Customize Results</span>
`;
  modalButton.onclick = toggleMobileModal;
  document.body.append(modalButton);
}

export async function insertMobileModal() {
  const mobileModal = document.createElement("div");
  const userLocation = await axios.get(
    "https://geometer.lincx.la/api/lookup"
  );
  mobileModal.innerHTML = `
    <div id="mobileModalContainer">
    <div id="mobileOverlay"></div>
    <div id="mobileModal">
      <div class="modalHeader">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:v="https://vecta.io/nano" viewBox="0 0 477.867 477.867"><path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z"/></svg>
        <span>Customize Results</span>
      </div>
      <div class="modalBody">
        <div class="controlGroup">
          <label for="loanPurpose">Loan Purpose</label>
          <div class="mobileDD">
            <select id="loanPurpose" onchange="cym.handleSelectChanged(this)">
              <option value="refi">Home Refinance</option>
              <option value="purchase">Home Purchase</option>
              <option value="equity">Home Equity</option>
            </select>
          </div>
        </div>

        <div class="controlGroup" id="closing" style="display: none;">
          <label for="when">How soon are you looking to close?</label>
          <div class="mobileDD">
            <select id="when" onchange="cym.handleSelectChanged(this)">
              <option value="soon">Very soon</option>
              <option value="notSoon">Not soon</option>
            </select>
          </div>
        </div>

        <div class="controlGroup">
          <label for="creditScore">Credit Score</label>
          <div class="mobileDD">
            <select id="creditScore" onchange="cym.handleSelectChanged(this)">
              <option value="excellent">Excellent (700+)</option>
              <option value="good" selected>Good (580-699)</option>
              <option value="fair">Fair (520-579)</option>
              <option value="poor">Poor (519 or lower)</option>
            </select>
          </div>
        </div>

        <div class="controlGroup">
          <label for="loanAmount">Loan Amount</label>
          <div class="mobileDD">
            <select id="loanAmount" onchange="cym.handleSelectChanged(this)">
              <option value="100">Up to 100K</option>
              <option value="100-250" selected>100K - 250K</option>
              <option value="250-400">250K - 400K</option>
              <option value="400+">400K and Up</option>
            </select>
          </div>
        </div>

        <div class="controlGroup">
          <label for="location">Your Location</label>
          <div class="mobileDD">
            <select id="location" onchange="cym.handleSelectChanged(this)">
              ${getStates()
                .map(
                  (state) => `
                    <option value="${state.abbreviation}"
                      ${
                        state.abbreviation === userLocation.data.region
                          ? "selected"
                          : ""
                      }>
                      ${state.name}
                    </option>`
                )
                .join("\n")}
            </select>
          </div>
        </div>
        <div class="controlGroup">
          <button class="modalButton" onclick="cym.handleMobileRunFilter()">Update my results</button>
        </div>
      </div>
      <div class="closeMobileModal" onclick="cym.toggleMobileModal()">X</div>
    </div>
    </div>
`;
  document.body.append(mobileModal);
}