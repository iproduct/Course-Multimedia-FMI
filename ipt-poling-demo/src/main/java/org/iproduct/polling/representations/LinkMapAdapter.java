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
package org.iproduct.polling.representations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.bind.annotation.adapters.XmlAdapter;



/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */

public class LinkMapAdapter extends XmlAdapter<LinksRepresentation, Map<String, LinkRepresentation>> { 

    @Override
    public Map<String, LinkRepresentation> unmarshal(LinksRepresentation v) throws Exception {
        Map map = new HashMap(); 
        v.getLinks().stream().forEachOrdered(link -> map.put(link.getRel(), link));
        return map;
    }

    @Override
    public LinksRepresentation marshal(Map<String, LinkRepresentation> map) throws Exception {
        List<LinkRepresentation> list = new ArrayList<>();
        map.values().stream().forEachOrdered(v -> list.add(v) );
        LinksRepresentation links = new LinksRepresentation(list); 
        return links;
    }
}
