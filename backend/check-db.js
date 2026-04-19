const mongoose = require('mongoose');

// Connect to local MongoDB (default is localhost:27017)
mongoose.connect('mongodb://localhost:27017/todoDB')
  .then(async () => {
    console.log('✓ Connected to local MongoDB');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections in todoDB:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // If todos collection exists, show document count
    if (collections.some(c => c.name === 'todos')) {
      const todosCollection = mongoose.connection.db.collection('todos');
      const count = await todosCollection.countDocuments();
      const sample = await todosCollection.findOne();
      
      console.log(`\nTodos collection: ${count} documents`);
      if (sample) {
        console.log('Sample document:', JSON.stringify(sample, null, 2));
      }
    }
    
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Connection error:', err.message);
    process.exit(1);
  });
