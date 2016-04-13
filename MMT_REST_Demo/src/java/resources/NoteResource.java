/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2003-2014 IPT - Intellectual Products & Technologies.
 * All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 with Classpath Exception only ("GPL"). 
 * You may use this file only in compliance with GPL. You can find a copy 
 * of GPL in the root directory of this project in the file named LICENSE.txt.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the GPL file named LICENSE.txt in the root directory of 
 * the project.
 *
 * GPL Classpath Exception:
 * IPT - Intellectual Products & Technologies (IPT) designates this particular 
 * file as subject to the "Classpath" exception as provided by IPT in the GPL 
 * Version 2 License file that accompanies this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 */
package resources;

import entity.Note;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */

@Path("notes")
public class NoteResource {
    private static final Note[] sampleNotes = {
            new Note("Note 1"),
            new Note("Note 2"),
            new Note("Note 3")
    };
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<Note> getAllNotes(){
        ArrayList<Note> notes = new ArrayList<>();
        notes.addAll(Arrays.asList(sampleNotes));
//        GenericEntity<ArrayList<Note>> genNotes = new GenericEntity<ArrayList<Note>>(notes){};
//        return Response.ok(genNotes).build();
        return notes;
    }
    
}
