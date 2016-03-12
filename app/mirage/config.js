export default function() {

  this.get('/parishioners', function() {
    return { data: [ 
        { 
            type: 'parishioner',
            id: 1,
            attributes: {
                name: 'Ptaszek Katarzyna, Michal',
                city: 'Krakow',
                street: 'al. Pokoju',
                streetNumber: '37'      
            }
        },
        { 
            type: 'parishioner',
            id: 2,
            attributes: {
                name: 'Opiola Malgorzata, Piotr',
                city: 'Krakow',
                street: 'al. Pokoju',
                streetNumber: '37'      
            }
        },
    ]};
  });
  
//   this.get('/offerings', function() {
//     return { data: [ 
//         { 
//             type: 'offering',
//             id: 1,
//             attributes: {
//                 value: 100,
//                 date: '2016-03-10'
//             },
//             relationships: {
//                 parishioner: { data: { id: 1, type: 'parishioner' } }
//             }
//         }
//     ]};
//   });
  
    this.get('/offerings', function(db, request) {
        return {
            data: db.offerings.map(attrs => (
                { type: 'offering', id: attrs.id, attributes: attrs }
            ))
        };
    })
    
    this.get('/offerings/:id', function(db, request) {
        return {
            data: db.offerings.find(request.params.id)
        };
    })
    
    this.post('/offerings', function(db, request) {
        var attrs = JSON.parse(request.requestBody);
        var offering = db.offerings.insert(attrs);
        return offering;
    });
  
  this.get('/parishioners/1', function() {
    return { data: {
        type: 'parishioner',
        id: 1,
        attributes: {
            name: 'Ptaszek Katarzyna, Michal',
            city: 'Krakow',
            street: 'al. Pokoju',
            streetNumber: '37'
        }      
    }};
  });
  this.get('/parishioners/2', function() {
    return { data: { 
        type: 'parishioner',
        id: 2,
        attributes: {
            name: 'Opiola Malgorzata, Piotr',
            city: 'Krakow',
            street: 'al. Pokoju',
            streetNumber: '37'      
        }
    }};
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
