<template>
  <div>
    <div
      id="google_translate_element"
      class="mr-3"
      @change="$emit('languageChanged')"
    ></div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="primary"
      height="5"
      striped
    />
    <v-list class="hide">
      <v-list-item
        v-for="(option, index) in optionsArray"
        :key="index"
        @click="selectIndex(option.index)"
      >
        <v-list-item-title class="listItem">{{
          option.text
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages:
        "ar,bn,de,en,es,fr,hi,it,ja,jw,ko,mr,pa,pt,ru,ta,te,tr,vi,zh-CN",
      optionsArray: [],
      loading: false,
      selectedLanguage: {
        text: "English",
        value: "en",
        index: 4,
      },
    };
  },
  methods: {
    changed() {
      console.log("changed");
    },
    // this sets up the widget
    googleTranslateWidget() {
      const script = document.createElement("script");
      script.innerHTML = `
        let languages = "ar,bn,de,en,es,fr,hi,it,ja,jw,ko,mr,pa,pt,ru,ta,te,tr,vi,zh-CN"
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'auto',
            includedLanguages: languages,
            // layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            // attribution: google.translate.TranslateElement.InlineLayout.HIDDEN,
            autoDisplay: true, 
            }, 'google_translate_element');
            
        }
      `;
      document.head.appendChild(script);

      const translateScript = document.createElement("script");
      translateScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(translateScript);
    },
    getSelectOptions() {
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        const options = selectElement.options;
        console.log("selectElement.options", options);
        const optionsArray = [];

        // Iterate over the options
        for (let i = 0; i < options.length; i++) {
          const option = options[i];
          const optionObject = {
            text: option.text,
            value: option.value,
            index: i,
          };
          optionsArray.push(optionObject);
        }
        console.log(optionsArray);
        this.optionsArray = optionsArray;
      }
    },
    selectIndex(index) {
      this.selectedLanguage = this.optionsArray[index];
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        selectElement.selectedIndex = index;
        const event = new Event("change", { bubbles: true });
        selectElement.dispatchEvent(event);
      }
    },

    // this opens up the dropdown - however it does not work on mobile
    // openThirdPartyDropdown() {
    //   console.log('openThirdPartyDropdown');
    //   // Get a reference to the third-party select element by class
    //   const selectElement = document.querySelector('.goog-te-combo');
    //   console.log('selectElement', selectElement);

    //   if (selectElement) {
    //     // Open the select dropdown
    //     const optionsLength = selectElement.options.length
    //     selectElement.size = optionsLength
    //     selectElement.click();
    //     const options = selectElement.options
    //     // options.map((option, index) => {
    //     //   option.style.textAlign = 'center'
    //     //   option.style.fontSize = '1.1rem'
    //     //   option.style.cursor = 'pointer'
    //     //   option.style.marginTop = '3px'
    //     // }
    //     // )
    //     console.log('options', options);

    //   }
    // },
  },
  mounted() {
    this.googleTranslateWidget();
    // this.loading = true;
    // //delay next function call to allow google translate to load
    // setTimeout(() => {
    //   // this.openThirdPartyDropdown();
    //   this.getSelectOptions();
    //   this.loading = false;
    // }, 1000);
  },
};
</script>

<style>
#google_translate_element {
  margin-top: 15px;
}
.skiptranslate.goog-te-gadget {
  visibility: hidden;
}
#\:0\.targetLanguage {
  visibility: visible !important;
}
select.goog-te-combo {
  width: 100% !important;
  margin-top: 5px !important;
  padding: 5px !important;
  background-color: white;
  border: 3px solid #ccc !important;
  border-radius: 10px !important;
}
select.goog-te-combo > option {
  margin-top: 3px !important;
  font-size: 1.1rem !important;
  cursor: pointer !important;
}
.listItem {
  cursor: pointer;
  text-align: center !important;
  font-size: 1.1rem !important;
}
div.VIpgJd-ZVi9od-aZ2wEe-wOHMyf.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
  display: none !important;
}
.hide {
  display: none !important;
}
</style>
