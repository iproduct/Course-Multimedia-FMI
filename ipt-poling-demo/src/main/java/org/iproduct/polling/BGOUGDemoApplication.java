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
 */
package org.iproduct.polling;

import java.util.HashSet;
import java.util.Set;
import javax.mvc.annotation.CsrfValid;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.iproduct.polling.filter.CrossDomainFilter;
import org.iproduct.polling.mvc.controller.PollsController;
import org.iproduct.polling.mvc.controller.RootController;
import org.iproduct.polling.resources.AlternativesResource;
import org.iproduct.polling.resources.JAXBContextResolver;
import org.iproduct.polling.resources.PollsResource;
import org.iproduct.polling.resources.VotesResource;

/**
 * The JAX-RS bootstrap class that configures the polling application
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 *
 */
@ApplicationPath("/app")
@CsrfValid
public class BGOUGDemoApplication extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> set = new HashSet<>();
        set.add(RootController.class);
        set.add(PollsController.class);
        set.add(AlternativesResource.class);
        set.add(PollsResource.class);
        set.add(VotesResource.class);
        set.add(JAXBContextResolver.class);
        set.add(WebApplicationExceptionMapper.class);
        set.add(ClientErrorExceptionMapper.class);
        set.add(ConstraintViolationExceptionMapper.class);
        set.add(CrossDomainFilter.class);
        return set;
    }
}
