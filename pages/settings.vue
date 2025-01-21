<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleAddSetting">
          <v-text-field
            v-model="newSetting.key"
            label="Key"
            required
          ></v-text-field>
          <v-text-field
            v-model="newSetting.value"
            label="Value"
            required
          ></v-text-field>
          <v-select
            v-model="newSetting.type"
            :items="settingTypes"
            label="Type"
            required
          ></v-select>
          <v-btn type="submit" color="primary">Add Setting</v-btn>
        </v-form>
        <v-divider class="my-4"></v-divider>
        <v-data-table
          :headers="headers"
          :items="settings"
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Settings List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editSetting(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="handleDeleteSetting(item.id, item.key)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Setting</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleUpdateSetting">
            <v-text-field
              v-model="editedSetting.key"
              label="Key"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedSetting.value"
              label="Value"
              required
            ></v-text-field>
            <v-select
              v-model="editedSetting.type"
              :items="settingTypes"
              label="Type"
              required
            ></v-select>
            <v-btn type="submit" color="primary">Update Setting</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>{{ confirmDeleteMessage() }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmDeleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" text @click="confirmDelete"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const {
  settings,
  newSetting,
  editedSetting,
  dialog,
  settingTypes,
  headers,
  handleAddSetting,
  editSetting,
  handleUpdateSetting,
  deleteSetting,
} = useSettings();

const confirmDeleteDialog = ref(false);
const confirmDeleteMessage = (key) =>
  `Are you sure you want to delete this setting: ${deletedSettingKey.value} ?`;

const deletedSettingId = ref(null);
const deletedSettingKey = ref(null);

const handleDeleteSetting = (id, key) => {
  confirmDeleteDialog.value = true;
  deletedSettingId.value = id;
  deletedSettingKey.value = key;
};

const confirmDelete = () => {
  deleteSetting(deletedSettingId.value);
  confirmDeleteDialog.value = false;
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
