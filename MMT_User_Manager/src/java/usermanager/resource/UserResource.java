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
package usermanager.resource;

import java.net.URI;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import static javax.ws.rs.core.MediaType.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import usermanager.controller.UserController;
import usermanager.entity.User;


/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Path("users")
public class UserResource {
    @EJB
    UserController controller;
    
    @Context
    UriInfo uriInfo;

    @GET
    @Produces({APPLICATION_XML, APPLICATION_JSON})
    public List<User> getAllUsers(){
       return controller.getAllUsers();
    } 
    
    @GET
    @Path("{id}")
    @Produces({APPLICATION_XML, APPLICATION_JSON})
    public User getUserById(@PathParam("id") long id){
       return controller.getUsetById(id);
    }
    
    @POST
    @Consumes({APPLICATION_XML, APPLICATION_JSON})
    public Response addUser(User user){
        User created = controller.addUser(user);
        return Response.created(URI.create(
            UriBuilder.fromPath(uriInfo.getPath()).segment("" + created.getId()).build().toString()
        )).build();
    }

}
