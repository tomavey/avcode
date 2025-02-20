# AVCODE Demo Application

This is a Vue.js application that boasts a rich set of features, including:

- **User Authentication:** Secure user login and management powered by Supabase.
- **Dynamic Page Rendering:** Content that adapts and updates based on user interaction or data.
- **Rich Text Editor:** Create and edit text content with formatting options using Tiptap.
- **Responsive Design:** A seamless user experience across various devices, achieved with Vuetify.
- **Navigation Drawer:** Efficient navigation with dynamic items for a smooth user flow.
- **Settings Management:** User-specific preferences and configurations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Supabase](#supabase)
  - [Vuetify](#vuetify)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

This application offers a comprehensive development environment:

- User authentication with Supabase for secure access control.
- Dynamic page rendering for a fluid and interactive user experience.
- Rich text editor with Tiptap to empower users with content creation and formatting.
- Responsive design built with Vuetify, ensuring optimal viewing across all devices.
- Navigation drawer with dynamic items for intuitive navigation.
- Settings management to cater to individual user preferences.
- Language translation.

## Installation

To get started with this project, clone the repository and install the dependencies:

- git clone https://github.com/tomavey/avcode.git
- cd your-repo-name
- npm install

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tomavey/avcode.git
   ```

## Usage

To run the application locally, use the following command:

- npm run serve

This will start a development server at http://localhost:8080.

## Configuration

Supabase
This application uses Supabase for backend services. You need to configure your Supabase project by providing the necessary environment variables. Create a .env file in the root directory and add the following:

- VUE_APP_SUPABASE_URL=your-supabase-url
- VUE_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

## Vuetify

Vuetify is used for the UI components. You can customize the theme and other settings in the vuetify.js configuration file.

## Project Structure

Here's an overview of the project's structure:

```
src/
├── assets/
├── components/
│   ├── BubbleMenu.vue
│   ├── avTiptapEditor.vue
│   └── ...
├── composables/
│   ├── useDrawerItems.js
│   ├── usePages.js
│   └── useSettings.js
├── pages/
│   ├── [id].vue
│   ├── avPageForm.vue
│   └── ...
├── App.vue
├── main.js
└── router.js
```

This markup represents a directory structure using a simple list format.

- **`src/`:** The root directory of the project.
- **`assets/`:** A directory for storing static assets like images, fonts, etc.
- **`components/`:** A directory containing reusable Vue.js components, such as:
  - `BubbleMenu.vue`
  - `avTiptapEditor.vue`
  - (Other component files)
- **`composables/`:** A directory for storing composables (functions that provide logic to be used across multiple components), such as:
  - `useDrawerItems.js`
  - `usePages.js`
  - `useSettings.js`
- **`pages/`:** A directory containing Vue.js components representing individual pages or views within the application, such as:
  - `[id].vue` (likely a dynamic route component)
  - `avPageForm.vue`
  - (Other page components)
- **`App.vue`:** The main root component of the Vue.js application.
- **`main.js`:** The entry point of the application where the Vue instance is created.
- **`router.js`:** The file where the application's routing configuration is defined.

This structure is a common and recommended way to organize a Vue.js project, promoting code reusability, maintainability, and better separation of concerns.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

- Fork the repository
- Create a new branch (git checkout -b feature-branch)
- Make your changes
- Commit your changes (git commit -m 'Add new feature')
- Push to the branch (git push origin feature-branch)
- Open a pull request

## License

- This project is licensed under the MIT License. See the LICENSE file for more details.

- Feel free to customize this README document according to your project's specific details and requirements.

## SQL for tables and view

```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL,
  first_name TEXT NULL,
  last_name TEXT NULL,
  phone TEXT NULL,
  authorized_to TEXT[] NULL,
  email TEXT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;
```

```sql
create table
  public.pages (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    content character varying null,
    created_by character varying null,
    title text null,
    nav_name text null,
    show_card boolean null default true,
    nav_path text null,
    nav_rights text null,
    nav_icon text null,
    nav_sort_order numeric null,
    constraint pages_pkey primary key (id),
    constraint pages_nav_name_key unique (nav_name)
  ) tablespace pg_default;

```

```sql
create table
  public.settings (
    id serial not null,
    key character varying(255) not null,
    value text not null,
    type character varying(50) not null,
    created_at timestamp with time zone null default current_timestamp,
    updated_at timestamp with time zone null default current_timestamp,
    constraint settings_pkey primary key (id),
    constraint settings_key_key unique (key)
  ) tablespace pg_default;

```

```sql
create table
  public.tasks (
    id uuid not null default extensions.uuid_generate_v4 (),
    title text not null,
    description text null,
    due_date timestamp with time zone null,
    status character varying(20) null default 'TODO'::character varying,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint tasks_pkey primary key (id)
  ) tablespace pg_default;

```

```sql
  create view
  public.tasks_with_users as
select
  t.title,
  t.description,
  t.due_date,
  p.first_name,
  p.last_name
from
  tasks t
  left join user_tasks ut on t.id = ut.task_id
  left join profiles p on ut.user_id = p.id
group by
  t.id,
  t.title,
  t.description,
  t.due_date,
  p.first_name,
  p.last_name;
```

```sql
create table
  public.user_tasks (
    user_id uuid not null,
    task_id uuid not null,
    constraint user_tasks_pkey primary key (user_id, task_id),
    constraint user_tasks_task_id_fkey foreign key (task_id) references tasks (id),
    constraint user_tasks_user_id_fkey foreign key (user_id) references profiles (id)
  ) tablespace pg_default;
```
