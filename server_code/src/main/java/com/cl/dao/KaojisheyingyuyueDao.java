package com.cl.dao;

import com.cl.entity.KaojisheyingyuyueEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.KaojisheyingyuyueView;


/**
 * 考级摄影预约
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface KaojisheyingyuyueDao extends BaseMapper<KaojisheyingyuyueEntity> {
	
	List<KaojisheyingyuyueView> selectListView(@Param("ew") Wrapper<KaojisheyingyuyueEntity> wrapper);

	List<KaojisheyingyuyueView> selectListView(Pagination page,@Param("ew") Wrapper<KaojisheyingyuyueEntity> wrapper);
	
	KaojisheyingyuyueView selectView(@Param("ew") Wrapper<KaojisheyingyuyueEntity> wrapper);


}
