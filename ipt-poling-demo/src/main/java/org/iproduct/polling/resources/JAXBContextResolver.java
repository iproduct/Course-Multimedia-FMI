package org.iproduct.polling.resources;

import javax.ws.rs.ext.ContextResolver;
/* (c) Copyright IPT - Intellectual Products & Technologies Ltd., 2003-2014.
 * All rights reserved. This software program can be compiled and modified only as a part of the 
 * "SOA and Advanced Java Technologies" course provided by IPT - Intellectual Products & Technologies Ltd.,
 * for educational purposes only, and provided that this copyright notice is kept unchanged 
 * with the program. The program is provided "as is", without express or implied warranty of any 
 * kind, including any implied warranty of merchantability, fitness for a particular purpose or 
 * on-infringement. Should the Source Code or any resulting software prove defective, the user
 * assumes the cost of all necessary servicing, repair, or correction. In no event shall 
 * IPT - Intellectual Products & Technologies Ltd. be liable to any party under any legal theory 
 * for direct, indirect, special, incidental, or consequential damages, including lost profits, 
 * business interruption, loss of business information, or any other pecuniary loss, or for
 * personal injuries, arising out of the use of this source code and its documentation, or arising 
 * out of the inability to use any resulting program, even if IPT - Intellectual Products & 
 * Technologies Ltd. has been advised of the possibility of such damage. 
 * Contact information: http://www.iproduct.org, e-mail: office@iproduct.org 
*/

import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import org.iproduct.polling.entity.Alternative;
import org.iproduct.polling.entity.Poll;
import org.iproduct.polling.entity.Vote;
import org.iproduct.polling.representations.PollRepresentationCustomLinks;
import org.iproduct.polling.representations.PollRepresentationDocumentLinks;
import org.iproduct.polling.representations.PollRepresentationHeaderLinks;



@Provider
public class JAXBContextResolver implements ContextResolver<JAXBContext> {

	private JAXBContext context;
	private Class<?>[] types = 
            { 
//                Poll.class, PollRepresentationCustomLinks.class, 
//                PollRepresentationDocumentLinks.class,
//                PollRepresentationHeaderLinks.class,
//                Alternative.class, Vote.class, 
                };

	public JAXBContextResolver() throws Exception {
//          this.context = 
//   	  new JSONJAXBContext(JSONConfiguration.natural().rootUnwrapping(true).build(), types); 
     }

        @Override
	public JAXBContext getContext(Class<?> objectType) {
		for (Class<?> type : types) {
			if(type.equals(objectType)) {
				return context;
			}
		}
		return null;
	}
}