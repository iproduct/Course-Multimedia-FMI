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
package org.iproduct.polling;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Provider
public class WebApplicationExceptionMapper implements 
        ExceptionMapper<WebApplicationException> {
  @Override
  public Response toResponse(WebApplicationException ex) {
    System.out.println("!!!!Web Application EXCEPTION Catched: " + ex);
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("hello.jsp").build();
//    return Response.status(ex.getResponse().getStatus()).
//      entity(ex.getMessage()).
//      type("text/plain").
//      build();
  }
}
