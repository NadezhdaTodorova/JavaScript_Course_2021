import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getAddressFromCoords, getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById('share-link');  
    if(!navigator.clipboard){
        sharedLinkInputElement.select();
        return;
      }

      navigator.clipboard.writeText(sharedLinkInputElement.value)
        .then(() => {
            alert('Copied to clipboard');
        })
        .catch(err => {
            sharedLinkInputElement.select();
            console.log(err);
        });
  } 

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    fetch('http://localhost:3000/add-location', {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }) .then(data => {
      const locationId = data.locId;
      this.shareBtn.disabled = false;
      const sharedLinkInputElement = document.getElementById('share-link');
      sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}}`;
    });
   
  }

 locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature is not available in your browser!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
     async (successResult) =>  {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you unfortunately. Please enter an address manually!"
        );
      }
    );
  }
  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Please enter a valid address!");
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    try{
        const coordinates = await getCoordsFromAddress(address);
        this.selectPlace(coordinates, address);
    } catch (err) {
        alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
