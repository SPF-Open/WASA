<script lang="ts">
    import DropZone from 'svelte-atoms/DropZone.svelte';
    import { file } from '../store';
  
    const maxLenghtName = 45;
    let fileName = '';
    const onChange = async (e) => {
      const fileTemp = e.dataTransfer
        ? e.dataTransfer.files[0]
        : e.target.files[0];
  
      fileName = fileTemp
        ? fileTemp.name.length > maxLenghtName
          ? fileTemp.name.slice(0, maxLenghtName - 3) + '...'
          : fileTemp.name
        : '';

      // Update Store item
      file.set(fileTemp);
    };
  </script>
  
  <div>
    <DropZone
      title={'Drag & drop or'}
      fileTitle={fileName}
      dropOnPage
      on:drop={onChange}
      on:change={onChange}
    />
  </div>
  
  <style>
    div {
      border: 3px solid #00566b;
      border-radius: 12px;
      margin-left: -1.5px;
      min-width: max(300px, 60vw);
    }
  </style>